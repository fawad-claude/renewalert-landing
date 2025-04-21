import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, RefreshCw, User, Mail, Phone, FileText, Calendar } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// Admin API key
const ADMIN_API_KEY = "renewal-alert-admin-2024";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"signups">("signups");

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
        const response = await fetch("/api/admin/signups", {
          method: "GET",
          headers: {
            "X-API-KEY": ADMIN_API_KEY,
          },
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (err) {
        console.error("Error fetching signups:", err);
        throw err;
      }
    },
  });

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

  if (isError) {
    return (
      <div className="container mx-auto py-10 px-4">
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

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => refetch()}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          <RefreshCw size={16} /> <span>Refresh</span>
        </button>
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