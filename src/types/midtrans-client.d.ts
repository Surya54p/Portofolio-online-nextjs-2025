declare module "midtrans-client" {
  //
  // ==== TYPE ====
  //
  type TransactionStatus =
    | "capture"
    | "settlement"
    | "pending"
    | "deny"
    | "expire"
    | "cancel";

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

  interface CreditCard {
    secure?: boolean;
  }

  interface TransactionParameter {
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    credit_card?: CreditCard;
    [key: string]: unknown;
  }

  interface TransactionResponse {
    token: string;
    redirect_url: string;
  }

  interface TransactionStatusResponse {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_status: TransactionStatus;
    signature_key: string;
  }

  //
  // ==== SNAP ====
  //
  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey?: string;
    });

    createTransaction(
      params: TransactionParameter
    ): Promise<TransactionResponse>;

    createTransactionToken(params: TransactionParameter): Promise<string>;
  }

  //
  // ==== CORE API ====
  //
  export class CoreApi {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey?: string;
    });

    charge(params: Record<string, unknown>): Promise<TransactionStatusResponse>;

    transaction: {
      status(orderId: string): Promise<TransactionStatusResponse>;
      approve(orderId: string): Promise<TransactionStatusResponse>;
      cancel(orderId: string): Promise<TransactionStatusResponse>;
      expire(orderId: string): Promise<TransactionStatusResponse>;
    };
  }
}
