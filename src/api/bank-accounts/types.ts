export type VerifyBankAccountRequestPayload = {
  banknumber: string;
  bankname: string;
  currency: string;
};

export type CreateVBAPayload = {
  currency: string;
};

export type CreateBankAccountRequestPayload = {
  banknumber: string | number;
  bankname: string;
  code: string;
  accountname: string;
  currency: string;
};

export type VerifyBVNPayload = {
  firstName: string;
  lastName: string;
  bvn: string;
  currency?: string;
};

export type DeleteBankAccountRequestPayload = {
  bank_id: string;
};
