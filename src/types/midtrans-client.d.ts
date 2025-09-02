declare module "midtrans-client" {
  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  interface TransactionParameter {
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    credit_card?: {
      secure?: boolean;
    };
    [key: string]: unknown;
  }

  interface TransactionResponse {
    token: string;
    redirect_url: string;
  }

  export class Snap {
    constructor(options: { isProduction: boolean; serverKey: string; clientKey?: string });
    createTransaction(params: TransactionParameter): Promise<TransactionResponse>;
    createTransactionToken(params: TransactionParameter): Promise<string>;
  }
}
