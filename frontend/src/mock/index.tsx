import { Address, UserInfo, TaxInfo, InvoiceItem, PaymentTerms, Invoice, DynamicInvoiceToken } from '@/types';

// Mock data for Address
const mockAddresses: Address[] = [
    { street: '123 Main St', city: 'Anytown', zipCode: '12345', country: 'USA', state: 'CA' },
    { street: '456 Elm St', city: 'Othertown', zipCode: '67890', country: 'USA', state: 'NY' },
    { street: '789 Oak St', city: 'Sometown', zipCode: '11223', country: 'USA', state: 'TX' }
];

// Mock data for UserInfo
const mockUserInfos: UserInfo[] = [
    { email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', businessName: 'Doe Inc.', phone: '555-1234', address: mockAddresses[0], taxRegistration: '123456789', companyRegistration: '987654321' },
    { email: 'jane.smith@example.com', firstName: 'Jane', lastName: 'Smith', businessName: 'Smith LLC', phone: '555-5678', address: mockAddresses[1], taxRegistration: '234567890', companyRegistration: '876543210' },
    { email: 'bob.jones@example.com', firstName: 'Bob', lastName: 'Jones', businessName: 'Jones Co.', phone: '555-9012', address: mockAddresses[2], taxRegistration: '345678901', companyRegistration: '765432109' }
];

// Mock data for TaxInfo
const mockTaxInfos: TaxInfo[] = [
    { amount: '10%', type: 'percentage' },
    { amount: '5%', type: 'percentage' },
    { amount: '15%', type: 'percentage' }
];

// Mock data for InvoiceItem
const mockInvoiceItems: InvoiceItem[] = [
    { name: 'Item 1', reference: 'REF001', quantity: 1, unitPrice: '100.00', discount: '10%', tax: mockTaxInfos[0], currency: 'USD' },
    { name: 'Item 2', reference: 'REF002', quantity: 2, unitPrice: '50.00', discount: '5%', tax: mockTaxInfos[1], currency: 'USD' },
    { name: 'Item 3', reference: 'REF003', quantity: 3, unitPrice: '30.00', discount: '15%', tax: mockTaxInfos[2], currency: 'USD' }
];

// Mock data for PaymentTerms
const mockPaymentTerms: PaymentTerms[] = [
    { dueDate: '2023-12-31', lateFeesPercent: 5, lateFeesFix: '10.00' },
    { dueDate: '2024-01-31', lateFeesPercent: 10, lateFeesFix: '20.00' },
    { dueDate: '2024-02-28', lateFeesPercent: 15, lateFeesFix: '30.00' }
];

// Mock data for Invoice
const mockInvoices: Invoice[] = [
    { meta: { format: 'rnf_invoice', version: '0.0.3' }, creationDate: '2023-01-01', invoiceNumber: 'INV001', sellerInfo: mockUserInfos[0], buyerInfo: mockUserInfos[1], invoiceItems: [mockInvoiceItems[0]], paymentTerms: mockPaymentTerms[0] },
    { meta: { format: 'rnf_invoice', version: '0.0.3' }, creationDate: '2023-02-01', invoiceNumber: 'INV002', sellerInfo: mockUserInfos[1], buyerInfo: mockUserInfos[2], invoiceItems: [mockInvoiceItems[1]], paymentTerms: mockPaymentTerms[1] },
    { meta: { format: 'rnf_invoice', version: '0.0.3' }, creationDate: '2023-03-01', invoiceNumber: 'INV003', sellerInfo: mockUserInfos[2], buyerInfo: mockUserInfos[0], invoiceItems: [mockInvoiceItems[2]], paymentTerms: mockPaymentTerms[2] }
];

// Mock data for DynamicInvoiceToken
const mockDynamicInvoiceTokens: DynamicInvoiceToken[] = [
    { name: 'Token1', symbol: 'TKN1', requestId: '01e520b753513320335466318d533e7576dcea75c1f25ca50b38073ed43ae31f24', paymentReference: '0x2f6503bf7069cb56', payer: 'payer1', payee: 'payee1', amount: 100, amountPaid: 50, status: 1, children: [], pay: async () => { }, spawnChild: async () => 'child1' },
    { name: 'Token2', symbol: 'TKN2', requestId: '01fd5c3defd4790ff08d380c4d1273750927d030e8cbcfc2bcf0bfd9bc15049b6f', paymentReference: '0x4b78a92aecdd1925', payer: 'payer2', payee: 'payee2', amount: 200, amountPaid: 100, status: 2, children: [], pay: async () => { }, spawnChild: async () => 'child2' },
    { name: 'Token3', symbol: 'TKN3', requestId: '01e2e2076f19f4bb0b6eed50a67ab395e1d8378df7f3105eb77d6d67ee7ed9a668', paymentReference: '0x63c8dd2cce92f879', payer: 'payer3', payee: 'payee3', amount: 300, amountPaid: 150, status: 3, children: [], pay: async () => { }, spawnChild: async () => 'child3' }
];

export { mockAddresses, mockUserInfos, mockTaxInfos, mockInvoiceItems, mockPaymentTerms, mockInvoices, mockDynamicInvoiceTokens };
