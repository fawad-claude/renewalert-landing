import { useState } from "react";
import { Lock, AlertTriangle, Loader2 } from "lucide-react";

// Simple admin debugging page
export default function AdminDebugPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Test the API endpoint directly
  const testAdminEndpoint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      // Log the request details
      console.log("Testing admin endpoint with key length:", apiKey.length);
      
      // Test the endpoint directly
      const response = await fetch("/api/admin/signups", {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
        },
      });
      
      console.log("Response status:", response.status);
      
      // Get response as text first
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      // Try to parse as JSON
      try {
        const responseData = responseText ? JSON.parse(responseText) : {};
        setResponse({
          status: response.status,
          statusText: response.statusText,
          data: responseData,
          headers: Object.fromEntries(response.headers.entries()),
        });
      } catch (parseError) {
        setResponse({
          status: response.status,
          statusText: response.statusText,
          text: responseText,
          headers: Object.fromEntries(response.headers.entries()),
          parseError: "Failed to parse response as JSON",
        });
      }
    } catch (err) {
      console.error("Error testing endpoint:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <AlertTriangle className="h-10 w-10 text-amber-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Endpoint Debugging</h1>
        </div>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Lock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                This tool helps debug issues with the admin API. Enter your admin API key to test the endpoint directly.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={testAdminEndpoint} className="mb-8">
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              Admin API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value.trim())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter your admin API key"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...
              </>
            ) : (
              "Test Admin Endpoint"
            )}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {response && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Response</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <p className={`text-md font-mono ${response.status < 400 ? 'text-green-600' : 'text-red-600'}`}>
                  {response.status} {response.statusText}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-500">Content Type</span>
                <p className="text-md font-mono">{response.headers?.['content-type'] || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Response Body</h4>
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 text-sm">
                {JSON.stringify(response.data || response.text || {}, null, 2)}
              </pre>
            </div>
            
            {response.parseError && (
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <p className="text-sm text-yellow-700">{response.parseError}</p>
              </div>
            )}
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Response Headers</h4>
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-40 text-sm">
                {JSON.stringify(response.headers || {}, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}