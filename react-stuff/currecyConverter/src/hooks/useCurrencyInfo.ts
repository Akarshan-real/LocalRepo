import axios from "axios";
import { useEffect , useState } from "react";

export type ApiResponse = {
  date: string,
  [baseCurrency: string]: string | {
    [targetCurrency: string] : number
  };
};


export const useCurrencyInfo = (currency : string) => {
    const [response, setResponse] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const pull = async () => {
            try {
                const res = await axios.get<ApiResponse>(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2026.2.14/v1/currencies/${currency}.json`);
                setResponse(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        pull();
    }, [currency]);

    return response;
};