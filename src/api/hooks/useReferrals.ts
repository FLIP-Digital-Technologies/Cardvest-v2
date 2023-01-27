import { getReferredUsers } from '@api/referrals/referrals';
import { useQuery } from '@tanstack/react-query';

function useGetReferredUsers() {
  return useQuery([`referred-users`], () => getReferredUsers());
}

export { useGetReferredUsers };
