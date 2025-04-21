import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  console.log(`API request: ${method} ${url}`, data);
  
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    console.log(`Response status: ${res.status}`);
    
    // First handle error cases
    if (!res.ok) {
      // Try to get a more detailed error message from the JSON response
      try {
        const errorData = await res.json();
        console.error('Error response data:', errorData);
        
        // Try to extract meaningful error messages
        const errorMessage = 
          errorData.message || 
          errorData.error || 
          errorData.errors || 
          `${res.status}: ${res.statusText}`;
          
        throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
      } catch (jsonError) {
        // If we can't parse JSON, fall back to text
        const text = await res.text();
        console.error('Error response text:', text);
        throw new Error(`${res.status}: ${text || res.statusText}`);
      }
    }
    
    // Handle success cases - most APIs return JSON
    try {
      const jsonData = await res.json();
      console.log('Response data:', jsonData);
      return jsonData;
    } catch (jsonError) {
      // If not JSON, return the response directly (rare)
      console.log('Response is not JSON');
      return res;
    }
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
