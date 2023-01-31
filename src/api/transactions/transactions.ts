import ApiClient from '@api';
import env from '@env';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import {
  CreateSellOrderRequestPayload,
  CreateBuyOrderRequestPayload,
  TransactionRequestPayload,
  CancelTransactionRequestPayload,
  PurchaseAirtimeRequestPayload,
  DataPlansRequestPayload,
  PurchaseDataPlansRequestPayload,
  RetryDataPlanPurchaseRequestPayload,
  VerifyDataPlanPurchase,
  PurchaseWifiPlanslRequestPayload,
  VerifyWifiPlanPurchaseRequestPayload,
  VerifyWifiPlanRequestPayload,
  RetryWifiPlanPurchaseRequestPayload,
  PurchaseElectricityTokenRequestPayload,
  VerifyMeterRequestPayload,
  RetryTokenPurchaseRequestPayload,
  VeriyPowerTokenPurchaseRequestPayload,
} from './types';

export async function getAllTransactions(currency: string, page = 1) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions?currency=${currency}`, {
      params: { page, currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    console.error('getAllTransactions - Error: ', error);
    onOpenToast({
      status: 'error',
      message: error?.response?.data?.message || 'An Error occurred',
    });
    throw error;
  }
}

export async function getPayoutTransactions(currency: string, page = 1) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/payouts?currency=${currency}`, {
      params: { page, currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getPayoutTransactions - Error: ', error);
    throw error;
  }
}

export async function uploadGiftcardImage() {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/image-upload`, {});

    return response.data;
  } catch (error) {
    console.error('uploadGiftcardImage - Error: ', error);
    throw error;
  }
}

export async function createSellOrder({
  card_id,
  amount,
  images,
  to_bank,
  bank,
  comment,
}: CreateSellOrderRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/sell`, {
      card_id,
      amount,
      images,
      to_bank,
      bank,
      comment,
    });

    return response.data;
  } catch (error) {
    console.error('createSellOrder - Error: ', error);
    throw error;
  }
}

export async function createBuyOrder({ card_id, amount, comment, currency }: CreateBuyOrderRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/buy`,
      {
        card_id,
        amount,
        // comment,
        currency,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('createBuyOrder - Error: ', error);
    throw error;
  }
}

export async function getTransaction({ transaction_reference }: TransactionRequestPayload) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/${transaction_reference}`);

    return response.data;
  } catch (error) {
    console.error('getTransaction - Error: ', error);
    throw error;
  }
}

export async function cancelTransaction({ transaction_reference }: CancelTransactionRequestPayload) {
  try {
    const response = await ApiClient.delete(`${env.API_URL}/transactions/${transaction_reference}`);

    return response.data;
  } catch (error) {
    console.error('cancelTransaction - Error: ', error);
    throw error;
  }
}

export async function purchaseAirtime({ currency, phone_no, product, amount }: PurchaseAirtimeRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/airtime`, {
      currency,
      phone_no,
      product,
      amount,
    });

    return response.data;
  } catch (error) {
    console.error('purchaseAirtime - Error: ', error);
    throw error;
  }
}

export async function getAllBillTransaction() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/airtime/all`);

    return response.data;
  } catch (error) {
    console.error('getAllBillTransaction - Error: ', error);
    throw error;
  }
}

export async function getAllAirtimeNetworks() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/airtime/networks`);

    return response.data;
  } catch (error) {
    console.error('getAllAirtimeNetworks - Error: ', error);
    throw error;
  }
}

export async function getAllDataPlans({ product }: DataPlansRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/data/plans`, { product });

    return response.data;
  } catch (error) {
    console.error('getAllDataPlans - Error: ', error);
    throw error;
  }
}

export async function purchaseDataPlans({
  currency,
  phone_no,
  product,
  code,
  amount,
}: PurchaseDataPlansRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/data/purchase`, {
      currency,
      phone_no,
      product,
      code,
      amount,
    });

    return response.data;
  } catch (error) {
    console.error('purchaseDataPlans - Error: ', error);
    throw error;
  }
}

export async function retryDataPlanPurchase({ reference }: RetryDataPlanPurchaseRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/data/purchase/retry`, { reference });

    return response.data;
  } catch (error) {
    console.error('retryDataPlanPurchase - Error: ', error);
    throw error;
  }
}

export async function verifyDataPlanPurchase({ reference }: VerifyDataPlanPurchase) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/data/purchase/verify/${reference}`);

    return response.data;
  } catch (error) {
    console.error('verifyDataPlanPurchase - Error: ', error);
    throw error;
  }
}

export async function getWifiPlans() {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/wifi/plans`);

    return response.data;
  } catch (error) {
    console.error('getWifiPlans - Error: ', error);
    throw error;
  }
}

export async function purchaseWifiPlans({
  currency,
  device_no,
  product,
  code,
  amount,
}: PurchaseWifiPlanslRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/wifi/purchase`, {
      currency,
      device_no,
      product,
      code,
      amount,
    });

    return response.data;
  } catch (error) {
    console.error('purchaseWifiPlans - Error: ', error);
    throw error;
  }
}

export async function verifyWifiPlanPurchase({ reference }: VerifyWifiPlanPurchaseRequestPayload) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/wifi/purchase/verify/${reference}`);

    return response.data;
  } catch (error) {
    console.error('verifyWifiPlanPurchase - Error: ', error);
    throw error;
  }
}

export async function verifyWifiPlan({ device_no, product }: VerifyWifiPlanRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/wifi/verify/device`, {
      device_no,
      product,
    });

    return response.data;
  } catch (error) {
    console.error('verifyWifiPlan - Error: ', error);
    throw error;
  }
}

export async function retryWifiPlanPurchase({ reference }: RetryWifiPlanPurchaseRequestPayload) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/wifi/purchase/retry/${reference}`);

    return response.data;
  } catch (error) {
    console.error('retryWifiPlanPurchase - Error: ', error);
    throw error;
  }
}

export async function purchaseElectricityToken({
  product,
  meter_no,
  customer_name,
  meter_type,
  phone_no,
  currency,
  amount,
}: PurchaseElectricityTokenRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/electricity/purchase/token`, {
      product,
      meter_no,
      customer_name,
      meter_type,
      phone_no,
      currency,
      amount,
    });

    return response.data;
  } catch (error) {
    console.error('purchaseElectricityToken - Error: ', error);
    throw error;
  }
}

export async function verifyMeter({ product, meter_no, meter_type }: VerifyMeterRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/transactions/electricity/verify/meter`, {
      product,
      meter_no,
      meter_type,
    });

    return response.data;
  } catch (error) {
    console.error('verifyMeter - Error: ', error);
    throw error;
  }
}

export async function retryTokenPurchase({ reference }: RetryTokenPurchaseRequestPayload) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/electricity/purchase/retry/${reference}`);

    return response.data;
  } catch (error) {
    console.error('retryTokenPurchase - Error: ', error);
    throw error;
  }
}

export async function veriyPowerTokenPurchase({ reference }: VeriyPowerTokenPurchaseRequestPayload) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/transactions/electricity/verify/purchase/${reference}`);

    return response.data;
  } catch (error) {
    console.error('veriyPowerTokenPurchase - Error: ', error);
    throw error;
  }
}
