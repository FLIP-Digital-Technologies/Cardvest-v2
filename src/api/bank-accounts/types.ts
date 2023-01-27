export type VerifyBankAccountRequestPayload = {
  banknumber: number;
  bankname: string;
};

export type CreateBankAccountRequestPayload = {
  banknumber: number;
  bankname: string;
  code: string;
  accountname: string;
};

export type DeleteBankAccountRequestPayload = {
  bank_id: string;
};
