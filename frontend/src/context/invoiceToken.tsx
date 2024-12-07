import { DynamicInvoiceToken } from "@/types";
import { createContext, useContext } from "react";

export const DynamicInvoiceTokenContext = createContext<DynamicInvoiceToken | null>(null);

export const useInvoiceToken = () => {
    if (!useContext(DynamicInvoiceTokenContext)) {
        throw new Error("useInvoiceToken must be used within a DynamicInvoiceTokenProvider");
    }

    return useContext(DynamicInvoiceTokenContext);
}


