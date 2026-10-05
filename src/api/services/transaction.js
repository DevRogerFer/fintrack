import { protectedApi } from '@/lib/axios';

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado.
   * @param {Object} input - Dados da transação a ser criada.
   * @param {string} input.name - Nome da transação.
   * @param {number} input.amount - Valor da transação.
   * @param {Date} input.date - Data da transação (YYYY-MM-DD).
   * @param {string} input.type - Tipo da transação (EARNING, EXPENSE, INVESTMENT).
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input);
    return response.data;
  },
};
