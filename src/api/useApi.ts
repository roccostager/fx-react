import { useEffect, useState } from "react";

type FetchError = Error | null;
type Loading = boolean;
type Methods = "post" | "get" | "put" | "delete" | "publicPost" | "publicGet"
type Data = Record<string, unknown>;

import api from "./api";

function useApi(method: Methods, address: string, body: Data | undefined = undefined) {
    const [data, setData] = useState<Data | null>(null);
    const [error, setError] = useState<FetchError>(null);
    const [loading, setLoading] = useState<Loading>(true);

    useEffect(() => {
        (async () => {
            const response = await api[method](address, body);
            if (api.evaluateResponse(response)) {  // Successful Request
                setData(response);
            } else {
                setError(response);
            }
            setLoading(false);
        })()
    }, []);

    return { data, error, loading };
}

export default useApi;