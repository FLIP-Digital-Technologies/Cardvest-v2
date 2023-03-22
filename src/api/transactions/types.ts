export type CreateSellOrderRequestPayload = {
  card_id: number;
  amount: number;
  images?: any;
  to_bank?: string;
  bank?: number;
  currency: string;
  comment?: string;
};

export type CreateBuyOrderRequestPayload = {
  card_id: number;
  amount: number;
  comment: string;
  currency: string;
};

export type TransactionRequestPayload = {
  transaction_reference: number;
};

export type CancelTransactionRequestPayload = {
  transaction_reference: number;
};

export type PurchaseAirtimeRequestPayload = {
  currency: string;
  phone_no: string;
  product: string;
  amount: number;
};

export type DataPlansRequestPayload = {
  product: string;
};

export type PurchaseDataPlansRequestPayload = {
  currency: string;
  phone_no: string;
  product: string;
  code: string;
  amount: number;
};

export type RetryDataPlanPurchaseRequestPayload = {
  reference: string;
};

export type VerifyDataPlanPurchase = {
  reference: string;
};

export type PurchaseWifiPlanslRequestPayload = {
  currency: string;
  device_no: string;
  product: string;
  code: string;
  amount: number;
};

export type VerifyWifiPlanPurchaseRequestPayload = {
  reference: string;
};

export type VerifyWifiPlanRequestPayload = {
  device_no: string;
  product: string;
};

export type RetryWifiPlanPurchaseRequestPayload = {
  reference: string;
};

export type PurchaseElectricityTokenRequestPayload = {
  product: string;
  meter_no: number;
  customer_name: number;
  meter_type: string;
  phone_no: number;
  currency: string;
  amount: number;
};

export type VerifyMeterRequestPayload = {
  product: string;
  meter_no: number;
  meter_type: string;
};

export type RetryTokenPurchaseRequestPayload = {
  reference: string;
};

export type VeriyPowerTokenPurchaseRequestPayload = {
  reference: string;
};
