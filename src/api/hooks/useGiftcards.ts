import {
  getAllBuyGiftCardCategories,
  getAllCategories,
  getGiftcard,
  getGiftcardsToBuy,
  getGiftcardsToSell,
} from '@api/giftcards/giftcards';
import {
  GiftCardsToBuyRequestPayload,
  GiftCardsToSellRequestPayload,
  GiftcardRequestPayload,
} from '@api/giftcards/types';
import { useQuery } from '@tanstack/react-query';

function useGetAllBuyCategories() {
  return useQuery([`giftcard-buy-categories`], () => getAllBuyGiftCardCategories());
}

function useGetAllCategories() {
  return useQuery([`giftcard-categories`], () => getAllCategories());
}

function useGetGiftcardsToBuy({ category_id }: GiftCardsToBuyRequestPayload) {
  return useQuery([`giftcard-buy-${category_id}`, { category_id }], () => getGiftcardsToBuy({ category_id }), {
    enabled: !!category_id,
  });
}

function useGetGiftcardsToSell({ category_id }: GiftCardsToSellRequestPayload) {
  return useQuery([`giftcard-sell-${category_id}`, { category_id }], () => getGiftcardsToSell({ category_id }), {
    enabled: !!category_id,
  });
}

function useGetGiftcardDetails({ card_id }: any) {
  return useQuery([`giftcard-${card_id}`, { card_id }], () => getGiftcard({ card_id }));
}

export {
  useGetGiftcardDetails,
  useGetAllCategories,
  useGetGiftcardsToBuy,
  useGetGiftcardsToSell,
  useGetAllBuyCategories,
};
