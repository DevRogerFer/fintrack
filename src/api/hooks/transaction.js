import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthContext } from '@/contexts/auth';

import { TransactionService } from '../services/transaction';
import { getUserBalanceQueryKey } from './user';

export const createTransactionMutationKey = ['createTransaction'];

export const useCreateTransaction = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user?.id }),
      });
    },
  });
};
