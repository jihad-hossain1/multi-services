"use server";

const apiKey = process.env.PUBLIC_NEXT_URL! as string;

export const fetchFromServer = async ({
    apiEndpoint,
    queryParms,
}: {
    apiEndpoint: string;
    queryParms?: string;
}) => {
        const decryptUrl = atob(apiEndpoint);
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + decryptUrl + `${queryParms || ""}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
        return null;
    }
};
