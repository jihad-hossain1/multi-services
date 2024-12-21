import { useEffect, useState } from "react";
import { fetchFromServer } from "./serverFetch";

const apiKey = process.env.PUBLIC_NEXT_URL! as string;

type FetchPropsType = {
    apiEndpoint: string;
    queryParms?: string;
    shouldFetch?: () => boolean; // Optional dynamic condition for fetch
    shouldServerFetch?: boolean;
};

const useFetch = ({
    apiEndpoint,
    queryParms,
    shouldFetch = () => true, // Default to always fetch
    shouldServerFetch = false,
}: FetchPropsType) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<{ status: boolean; message: string }>({
        status: false,
        message: "",
    });
    const [responseData, setResponseData] = useState<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError({ status: false, message: "" });

                let data;

                if (shouldServerFetch) {
                    // Server-side data fetching
                    data = await fetchFromServer({
                        apiEndpoint,
                        queryParms,
                    });
                } else {
                    // Client-side data fetching
                    const response = await fetch(`${apiEndpoint}${queryParms || ""}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": apiKey,
                        },
                    });
    
                     data = await response.json();
                }
              
                setResponseData(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
                setError({ status: true, message: errorMessage });
            } finally {
                setIsLoading(false);
            }
        };

        // Execute fetch only if `shouldFetch` returns true
        if (shouldFetch()) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiEndpoint, queryParms]); // React to dependency changes.

    return {
        isLoading,
        responseData,
        error,
    };
};

export default useFetch;