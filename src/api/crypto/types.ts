interface Rate {
  GHS: number;
  NGN: number;
}

interface Rule {
  min: string;
  max: string;
  rates: Rate;
}

export interface Coin {
  name: string;
  value: string;
  label: string;
  rate: string;
  rules: Rule[];
}

export interface GetAvailableCoinsResponse {
  message: string;
  data: Coin[];
}

export type SellCryptoPayload = {
  currency: 'NGN' | 'GHS';
  amount: number;
  coin: string;
};

export type CryptoTradeData = {
  id: number;
  reference: string;
  type: string;
  amount: number;
  unit: number;
  status: string;
  created_at: string;
  coin: string;
  payable_amount: number;
  rate: number;
  usd_amount: number;
  payment_details: {
    id: number;
    minimumAmount: number;
    address: string;
    rate: number;
    expDate: string;
    qrCode: string;
  };
};

export type CryptoTransactionResponse = {
  message: string;
  data: CryptoTradeData;
};
