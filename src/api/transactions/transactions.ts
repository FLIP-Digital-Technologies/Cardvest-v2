import ApiClient from '@api';
import env from '@env';
import { cacheService } from '@utils/cache';
import {
  CreateSellOrderRequestPayload,
  CreateBuyOrderRequestPayload,
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

export async function getAllBillTransactions(currency: string, pagination: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/bills`, {
      params: { page: pagination?.pageParam, currency },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('getAllBillTransactions - Error: ', error);
    throw error;
  }
}

export async function getAllTransactions(currency: string, pagination: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions`, {
      params: { page: pagination?.pageParam, currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    console.error('getAllTransactions - Error: ', error);
    throw error;
  }
}

export async function getPayoutTransactions(currency: string, pagination: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/payouts`, {
      params: { page: pagination?.pageParam, currency },
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
  currency,
}: CreateSellOrderRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/sell`,
      {
        card_id,
        amount,
        images,
        to_bank,
        bank,
        comment,
        currency,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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

export async function getTransaction({ transaction_reference, type }: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(
      type === 'withdrawals'
        ? `${env.API_URL}/withdrawals/${transaction_reference}`
        : `${env.API_URL}/transactions/${transaction_reference}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log(response.data, 'fridge');
    return response.data;
  } catch (error) {
    console.error('getTransaction - Error: ', error);
    throw error;
  }
}

export async function cancelTransaction({ transaction_reference }: CancelTransactionRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.delete(`${env.API_URL}/transactions/${transaction_reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('cancelTransaction - Error: ', error);
    throw error;
  }
}

export async function purchaseAirtime({ currency, phone_no, product, amount }: PurchaseAirtimeRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/airtime`,
      {
        currency,
        phone_no,
        product,
        amount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('purchaseAirtime - Error: ', error);
    throw error;
  }
}

export async function getAllBillTransaction() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/airtime/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllBillTransaction - Error: ', error);
    throw error;
  }
}

export async function getAllAirtimeNetworks() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/airtime/networks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllAirtimeNetworks - Error: ', error);
    throw error;
  }
}

export async function getAllElectricityPlansProviders() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/electricity/providers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllElectricityPlansProviders - Error: ', error);
    throw error;
  }
}

export async function getAllWifiPlansProviders() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/wifi/providers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllWifiPlansProviders - Error: ', error);
    throw error;
  }
}

export async function getAllWifiPlans({ product }: DataPlansRequestPayload) {
  if (!product) return;
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/wifi/plans`,
      { product },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('getAllWifiPlans - Error: ', error);
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
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/wifi/purchase`,
      {
        currency,
        device_no,
        product,
        code,
        amount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('purchaseWifiPlans - Error: ', error);
    throw error;
  }
}

export async function getAllCablePlansProviders() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/cable/providers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllCablePlansProvider - Error: ', error);
    throw error;
  }
}

export async function getAllCablePlans({ product }: DataPlansRequestPayload) {
  if (!product) return;
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/cable/plans`,
      { product },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('getAllCablePlans - Error: ', error);
    throw error;
  }
}

export async function purchaseCablePlans({ currency, phone_no, product, code, amount, smart_card_no }: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/cable/purchase`,
      {
        currency,
        phone_no,
        product,
        code,
        amount,
        smart_card_no,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('purchaseCablePlans - Error: ', error);
    throw error;
  }
}

export async function getAllDataPlansProviders() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/data/providers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllDataPlansProvider - Error: ', error);
    throw error;
  }
}

export async function getAllDataPlans({ product }: DataPlansRequestPayload) {
  if (!product) return;
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/data/plans`,
      { product },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/data/purchase`,
      {
        currency,
        phone_no,
        product,
        code,
        amount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/transactions/electricity/purchase/token`,
      {
        product,
        meter_no,
        customer_name,
        meter_type,
        phone_no,
        currency,
        amount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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
