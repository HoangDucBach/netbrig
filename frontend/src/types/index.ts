export interface Address {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    state?: string;
}

export interface UserInfo {
    email?: string;
    firstName?: string;
    lastName?: string;
    businessName?: string;
    phone?: string;
    address?: Address;
    taxRegistration?: string;
    companyRegistration?: string;
    miscellaneous?: Record<string, any>;
}

export interface TaxInfo {
    amount: string;
    type: 'percentage' | 'fixed';
}

export interface InvoiceItem {
    name: string;
    reference?: string;
    quantity: number;
    unitPrice: string;
    discount?: string;
    tax: TaxInfo;
    currency: string;
    deliveryDate?: string;
    deliveryPeriod?: string;
}

export interface PaymentTerms {
    dueDate?: string;
    lateFeesPercent?: number;
    lateFeesFix?: string;
    miscellaneous?: Record<string, any>;
}

export interface Invoice {
    meta: {
        format: 'rnf_invoice';
        version: '0.0.3';
    };
    creationDate: string;
    invoiceNumber: string;
    purchaseOrderId?: string;
    note?: string;
    terms?: string;
    sellerInfo?: UserInfo;
    buyerInfo?: UserInfo;
    invoiceItems: InvoiceItem[];
    paymentTerms?: PaymentTerms;
    miscellaneous?: Record<string, any>;
}

export interface DynamicInvoiceToken {
    name: string;
    symbol: string;
    requestId: string;
    paymentReference: string;
    payer: string;
    payee: string;
    amount: string | number;
    amountPaid: string | number;
    status: 'pending' | 'partial_paid' | 'paid' | 'cancelled';
}