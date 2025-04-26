import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, RefreshCw, User, Mail, Phone, FileText, Calendar, ShieldAlert, Lock, AlertTriangle, Check, Search, X, Trash2, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/error-boundary";
import { 
  getCountryFromIP, 
  getCountryFromIPAsync, 
  getFallbackCountry,
  specialIPMappings 
} from "@/lib/ip-country-map";

// We'll request the admin API key from the server to avoid hardcoding it on the client
const ADMIN_KEY_HEADER = "X-API-KEY";

export default function AdminPage() {
  const { toast } = useToast();
  const [adminKey, setAdminKey] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const [ipCountries, setIpCountries] = useState<Record<string, string>>({});
  
  // Handle the admin login
  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      console.log("Attempting login with admin key (length):", adminKey.length);
      
      // Test the provided API key
      const response = await fetch("/api/admin/signups", {
        method: "GET",
        headers: {
          [ADMIN_KEY_HEADER]: adminKey,
        },
        credentials: "include",
      });
      
      console.log("API response status:", response.status);
      
      // Get the response text
      const responseText = await response.text();
      console.log("API response text:", responseText);
      
      // Handle empty response
      if (!responseText || responseText.trim() === '') {
        console.error("Received empty response from server");
        toast({
          title: "Server Error",
          description: "Server returned empty response. The server might be experiencing issues.",
          variant: "destructive",
        });
        setLoginLoading(false);
        return;
      }
      
      try {
        // Parse the response as JSON
        const responseData = JSON.parse(responseText);
        console.log("API response parsed:", responseData);
        
        if (response.ok) {
          // Success! Store in session storage and set authenticated
          sessionStorage.setItem("adminAuth", "true");
          sessionStorage.setItem("adminKey", adminKey);
          setIsAuthenticated(true);
          
          toast({
            title: "Authentication Successful",
            description: "Welcome to the admin dashboard",
            variant: "default",
          });
          
          // Trigger data fetch with a slight delay to ensure auth state is set
          setTimeout(() => {
            refetch();
            setLoginLoading(false);
          }, 500);
        } else {
          // Authentication failed
          console.error("Auth failed response:", responseData);
          toast({
            title: "Authentication Failed",
            description: `Invalid API key. Error: ${responseData.message || "Unknown error"}`,
            variant: "destructive",
          });
          setLoginLoading(false);
        }
      } catch (parseErr) {
        // JSON parse error
        console.error("Error parsing JSON response:", parseErr);
        toast({
          title: "Response Error",
          description: "Error parsing server response. Please check browser console for details.",
          variant: "destructive",
        });
        setLoginLoading(false);
      }
    } catch (err) {
      // Network or other error
      console.error("Authentication error:", err);
      toast({
        title: "Connection Error",
        description: `Authentication failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        variant: "destructive",
      });
      setLoginLoading(false);
    }
  };
  
  // Check for existing authentication on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("adminAuth");
    const savedKey = sessionStorage.getItem("adminKey");
    
    if (savedAuth === "true" && savedKey) {
      setAdminKey(savedKey);
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminKey");
    setIsAuthenticated(false);
    setAdminKey("");
  };


  const {
    data: signups,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["/api/admin/signups"],
    queryFn: async () => {
      try {
        console.log("🔍 Fetching admin data...");
        
        // Use the stored admin key for the request
        const storedKey = sessionStorage.getItem("adminKey") || adminKey;
        console.log("🔑 Using admin key (length):", storedKey?.length || 0);
        
        const response = await fetch("/api/admin/signups", {
          method: "GET",
          headers: {
            [ADMIN_KEY_HEADER]: storedKey,
          },
          credentials: "include",
        });
        
        console.log("📥 Response status:", response.status);
        
        if (!response.ok) {
          // If unauthorized, clear authentication state
          if (response.status === 401 || response.status === 403) {
            console.log("🚫 Unauthorized, clearing auth state");
            sessionStorage.removeItem("adminAuth");
            sessionStorage.removeItem("adminKey");
            setIsAuthenticated(false);
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        try {
          // Get response as text first to debug
          const text = await response.text();
          console.log("📄 Raw response text:", text.substring(0, 100) + (text.length > 100 ? "..." : ""));
          
          // Try to parse JSON
          const data = text ? JSON.parse(text) : null;
          console.log("📊 Parsed data structure:", Object.keys(data || {}));
          
          return data;
        } catch (parseErr) {
          console.error("❌ JSON parsing error:", parseErr);
          toast({
            title: "Data Error",
            description: "Could not parse response data. Check browser console for details.",
            variant: "destructive",
          });
          
          throw new Error(`Failed to parse response: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`);
        }
      } catch (err) {
        console.error("❌ Error fetching signups:", err);
        toast({
          title: "Network Error",
          description: err instanceof Error ? err.message : "Failed to fetch data",
          variant: "destructive",
        });
        throw err;
      }
    },
    enabled: isAuthenticated, // Only run query when authenticated
    retry: 1, // Only retry once to avoid infinite retries
    refetchOnWindowFocus: false, // Disable auto refetch on window focus to reduce errors
  });
  
  // Handle delete with confirmation
  const handleDelete = async (id: number) => {
    if (deleteConfirmId !== id) {
      // First click - show confirmation
      setDeleteConfirmId(id);
      return;
    }
    
    // Second click - proceed with delete
    try {
      setIsDeleting(true);
      
      // Call API to delete record
      await fetch(`/api/admin/signups/${id}`, {
        method: 'DELETE',
        headers: {
          [ADMIN_KEY_HEADER]: sessionStorage.getItem("adminKey") || adminKey,
        }
      });
      
      // Success - refresh data
      toast({
        title: "Record deleted",
        description: "The signup record has been deleted successfully.",
        variant: "default",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Failed to delete record",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };
  
  // Cancel delete confirmation
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };
  
  // Load country data from IPs when signups data changes
  useEffect(() => {
    if (signups?.data && Array.isArray(signups.data) && signups.data.length > 0) {
      // Collect all unique IP addresses
      const uniqueIPs = new Set<string>();
      signups.data.forEach((signup: any) => {
        if (signup.ipAddress && !ipCountries[signup.ipAddress]) {
          uniqueIPs.add(signup.ipAddress);
        }
      });
      
      // Fetch country data for each IP
      uniqueIPs.forEach(async (ip) => {
        try {
          const country = await getCountryFromIPAsync(ip);
          setIpCountries(prev => ({
            ...prev,
            [ip]: country
          }));
        } catch (err) {
          console.error(`Failed to fetch country for IP ${ip}:`, err);
        }
      });
    }
  }, [signups?.data, ipCountries]);
  
  // Toggle note expansion
  const toggleNoteExpansion = (id: number) => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Helper function to check if admin API key is properly set up
  const checkApiKeyEnvironment = async () => {
    try {
      const response = await fetch("/api/admin/check-env", {
        method: "GET",
      });
      const data = await response.json();
      toast({
        title: data.success ? "Environment Check Passed" : "Environment Check Failed",
        description: data.message,
        variant: data.success ? "default" : "destructive",
      });
    } catch (err) {
      toast({
        title: "Environment Check Failed",
        description: "Could not verify the admin environment setup.",
        variant: "destructive",
      });
    }
  };

  // Make more robust by adding error handling around the data rendering
  const renderUserList = () => {
    try {
      if (!signups || !signups.data || !Array.isArray(signups.data)) {
        return (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">No data or invalid data structure received.</p>
            <p className="text-sm text-gray-500 mt-2">
              Check the server logs or try the debugging tool.
            </p>
          </div>
        );
      }
      
      // Filter data based on search term
      const filteredData = signups.data.filter((signup: any) => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        const fullName = (signup.fullName || "").toLowerCase();
        const email = (signup.email || "").toLowerCase();
        const phone = (signup.phoneNumber || "").toLowerCase();
        const notes = (signup.notes || "").toLowerCase();
        const ip = (signup.ipAddress || "").toLowerCase();
        
        // Determine country for search
        let country = "unknown";
        if (signup.ipAddress) {
          // First try to get it from our cached ipCountries object
          if (ipCountries[signup.ipAddress]) {
            country = ipCountries[signup.ipAddress].toLowerCase();
          }
          // Then check special mappings
          else if (specialIPMappings[signup.ipAddress]) {
            country = specialIPMappings[signup.ipAddress].toLowerCase();
          } 
          // Finally use fallback
          else {
            country = getFallbackCountry(signup.ipAddress).toLowerCase();
          }
        }
        
        return (
          fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          phone.includes(searchLower) ||
          notes.includes(searchLower) ||
          ip.includes(searchLower) ||
          country.includes(searchLower)
        );
      });
      
      if (filteredData.length === 0) {
        return (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            {searchTerm ? (
              <>
                <p className="text-gray-700">No results match your search.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Try a different search term or clear the search.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700">No signup data available yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Submissions will appear here when users sign up.
                </p>
              </>
            )}
          </div>
        );
      }
      
      return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Submission
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opt-In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((signup: any, index: number) => {
                  // Determine country from IP using our utility function
                  let country = "Unknown";
                  
                  if (signup.ipAddress) {
                    // First try to get it from our cached ipCountries object
                    if (ipCountries[signup.ipAddress]) {
                      country = ipCountries[signup.ipAddress];
                    }
                    // Then check special mappings
                    else if (specialIPMappings[signup.ipAddress]) {
                      country = specialIPMappings[signup.ipAddress];
                    } 
                    // Finally use fallback
                    else {
                      country = getFallbackCountry(signup.ipAddress);
                    }
                  }
                  
                  return (
                    <tr key={signup.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(signup.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{signup.fullName || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {signup.phoneNumber ? `${signup.countryCode} ${signup.phoneNumber}` : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {signup.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        {signup.notes ? (
                          <div>
                            <div className={expandedNotes.has(signup.id) ? "" : "max-w-[200px] truncate"}>
                              {signup.notes}
                            </div>
                            {signup.notes.length > 20 && (
                              <button 
                                onClick={() => toggleNoteExpansion(signup.id)}
                                className="mt-1 text-xs text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                {expandedNotes.has(signup.id) ? (
                                  <>
                                    <ChevronUp className="h-3 w-3 mr-1" /> Collapse
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-3 w-3 mr-1" /> Expand
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          signup.optIn ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {signup.optIn ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {signup.ipAddress || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {country === "Loading..." ? (
                          <div className="flex items-center">
                            <Loader2 className="h-3 w-3 mr-1 animate-spin text-gray-400" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          country
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {deleteConfirmId === signup.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleDelete(signup.id)}
                              disabled={isDeleting}
                              className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-medium flex items-center"
                            >
                              {isDeleting ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Trash2 className="h-3 w-3 mr-1" />}
                              Confirm
                            </button>
                            <button
                              onClick={cancelDelete}
                              disabled={isDeleting}
                              className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDelete(signup.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } catch (err) {
      console.error("Error rendering user list:", err);
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error rendering user data</h3>
              <p className="mt-2 text-sm text-red-700">
                There was an error rendering the user list: {err instanceof Error ? err.message : "Unknown error"}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  // Display login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <ShieldAlert className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Admin Authentication</h1>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Lock className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  This area is restricted to authorized personnel only. Please enter your admin API key to continue.
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                Admin API Key
              </label>
              <input
                id="apiKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value.trim())} // Trim whitespace
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your admin API key"
                required
              />
              <p className="text-xs text-gray-500 mt-1 mb-2">
                Make sure to copy the exact key without any leading or trailing spaces.
              </p>
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={checkApiKeyEnvironment}
                  className="text-xs text-blue-600 hover:underline flex items-center"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Check API key environment
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show loading state after authentication
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading submissions...</span>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (isError) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              <Lock size={16} /> <span>Logout</span>
            </button>
          </div>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading submissions: {(error as Error)?.message || "An unknown error occurred."}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          <RefreshCw size={16} /> <span>Try Again</span>
        </button>
      </div>
    );
  }
  
  // Show dashboard when authenticated and data loaded
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => refetch()}
            className="flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <RefreshCw size={16} className="mr-2" /> Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <Lock size={16} className="mr-2" /> Logout
          </button>
        </div>
      </div>
      
      {signups?.source && (
        <div className={`p-3 rounded-md text-sm font-medium mb-4 ${
          signups.source === 'database' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        }`}>
          <div className="flex items-center">
            {signups.source === 'database' ? 
              <Check className="h-4 w-4 mr-2" /> : 
              <AlertTriangle className="h-4 w-4 mr-2" />
            }
            <span>Data Source: <strong>{signups.source === 'database' ? 'DATABASE' : 'LOG FILES (FALLBACK)'}</strong></span>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Signup Submissions {signups?.count && <span className="ml-2 py-1 px-2 bg-primary/10 text-primary text-sm rounded-full">{signups.count}</span>}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Contact information collected from the signup form.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, IP or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {renderUserList()}
        </div>
      </div>
    </div>
  );
}
