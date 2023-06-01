export type RetriveWithdrawalRequestPayload = {
  withdrawal_reference: number;
};

export type InitiateWithdrawalRequestPayload = {
  amount: number;
  currency: string;
  type: string;
  bank?: string;
  wallet_address?: string;
  network?: string;
};
