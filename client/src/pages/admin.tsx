import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, RefreshCw, User, Mail, Phone, FileText, Calendar, ShieldAlert, Lock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// We'll request the admin API key from the server to avoid hardcoding it on the client
const ADMIN_KEY_HEADER = "X-API-KEY";

// For debugging purposes - uncomment to see values in console
// const ADMIN_KEY_VALUE = "YOUR-API-KEY-HERE"; // Replace with actual key for testing

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"signups">("signups");
  const [adminKey, setAdminKey] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Handle the admin login
  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add debug logs
      console.log("Attempting login with admin key (length):", adminKey.length);
      
      // Test the provided API key
      const response = await fetch("/api/admin/signups", {
        method: "GET",
        headers: {
          [ADMIN_KEY_HEADER]: adminKey,
        },
        credentials: "include",
      });
      
      // More debug info
      console.log("API response status:", response.status);
      
      try {
        // Get the response data for debugging
        const responseText = await response.text();
        console.log("API response text:", responseText);
        
        // If response is empty, show error and return
        if (!responseText || responseText.trim() === '') {
          console.error("Received empty response from server");
          alert("Server returned empty response. The server might be experiencing issues.");
          return;
        }
        
        // Try to parse the response JSON
        try {
          const responseData = JSON.parse(responseText);
          console.log("API response parsed:", responseData);
          
          if (response.ok) {
            // If successful, store in session storage and set authenticated
            sessionStorage.setItem("adminAuth", "true");
            sessionStorage.setItem("adminKey", adminKey);
            setIsAuthenticated(true);
            // Trigger data fetch
            refetch();
          } else {
            console.error("Auth failed response:", responseData);
            alert(`Invalid API key. Error: ${responseData.message || "Unknown error"}`);
          }
        } catch (parseErr) {
          console.error("Error parsing JSON response:", parseErr);
          alert("Error parsing server response. Please check browser console for details.");
        }
      } catch (textErr) {
        console.error("Error reading response text:", textErr);
        alert("Error reading server response. Please check browser console for details.");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      alert(`Authentication failed: ${err instanceof Error ? err.message : "Unknown error"}`);
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
        // Use the stored admin key for the request
        const storedKey = sessionStorage.getItem("adminKey") || adminKey;
        
        const response = await fetch("/api/admin/signups", {
          method: "GET",
          headers: {
            [ADMIN_KEY_HEADER]: storedKey,
          },
          credentials: "include",
        });
        
        if (!response.ok) {
          // If unauthorized, clear authentication state
          if (response.status === 401 || response.status === 403) {
            sessionStorage.removeItem("adminAuth");
            sessionStorage.removeItem("adminKey");
            setIsAuthenticated(false);
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (err) {
        console.error("Error fetching signups:", err);
        throw err;
      }
    },
    enabled: isAuthenticated, // Only run query when authenticated
  });



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
              <p className="text-xs text-gray-500 mt-1">
                Make sure to copy the exact key without any leading or trailing spaces.
              </p>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Login to Dashboard
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
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
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

  // Function to toggle database mode (for testing fallback mechanism)
  const [dbSourceMode, setDbSourceMode] = useState<"auto" | "logs">("auto");
  
  const toggleDbMode = async () => {
    try {
      const newMode = dbSourceMode === "auto" ? "logs" : "auto";
      await fetch(`/api/admin/db-mode?mode=${newMode}`, {
        method: "GET",
        headers: {
          [ADMIN_KEY_HEADER]: sessionStorage.getItem("adminKey") || adminKey,
        },
      });
      setDbSourceMode(newMode);
      refetch();
    } catch (err) {
      console.error("Error toggling DB mode:", err);
    }
  };

  // Show dashboard when authenticated and data loaded
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={toggleDbMode}
            className="flex items-center space-x-2 border-2 px-6 py-3 rounded-md font-bold text-lg shadow-lg"
            style={{
              backgroundColor: dbSourceMode === "auto" ? "#ff9800" : "#4CAF50",
              color: "white",
              borderColor: dbSourceMode === "auto" ? "#e65100" : "#1b5e20",
              transition: "all 0.3s ease"
            }}
          >
            <span>
              {dbSourceMode === "auto" 
                ? "🔄 SWITCH TO LOG FILES MODE" 
                : "🔄 SWITCH TO DATABASE MODE"}
            </span>
          </button>
          <button
            onClick={() => refetch()}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            <RefreshCw size={16} /> <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            <Lock size={16} /> <span>Logout</span>
          </button>
        </div>
      </div>
      {/* Always show the data source, with a bold banner on top */}
      <div className={`mb-4 p-4 border-2 rounded-md text-base font-medium ${
        signups?.source === 'database' 
        ? 'bg-green-100 text-green-800 border-green-500' 
        : 'bg-yellow-100 text-yellow-800 border-yellow-500'
      }`}>
        <span className="text-lg">DATA SOURCE:</span> <span className="font-bold">{signups?.source === 'database' ? 'DATABASE' : 'LOG FILES (FALLBACK)'}</span>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "signups"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("signups")}
            >
              Signups ({signups?.count || 0})
            </button>
          </div>
        </div>

        {activeTab === "signups" && (
          <div className="overflow-x-auto">
            {signups?.data?.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">No signup data available yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Submissions will appear here when users sign up.
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opt-In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signups?.data?.map((signup: any) => (
                    <tr key={signup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User size={16} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {signup.fullName || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          {signup.email && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail size={14} className="mr-1" /> {signup.email}
                            </div>
                          )}
                          {signup.phoneNumber && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone size={14} className="mr-1" /> {signup.countryCode} {signup.phoneNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText size={14} className="mr-1" />
                          <span className="truncate max-w-xs">
                            {signup.notes || "No notes provided"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            signup.optIn
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {signup.optIn ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="font-mono">{signup.ipAddress || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          (signup.submissionCount || 0) >= 3 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {signup.submissionCount || 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(signup.createdAt).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}