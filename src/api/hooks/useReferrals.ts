import { getReferralUserCode, getReferredUsers } from '@api/referrals/referrals';
import { useQuery } from '@tanstack/react-query';

function useGetReferredUsers() {
  return useQuery([`referred-users`], () => getReferredUsers());
}

function useGetReferralUserCode() {
  return useQuery([`referred-code`], () => getReferralUserCode());
}

export { useGetReferredUsers, useGetReferralUserCode };
