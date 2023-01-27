export type RetriveWithdrawalRequestPayload = {
  withdrawal_reference: number;
};

export type InitiateWithdrawalRequestPayload = {
  amount: number;
  bank: string;
};
