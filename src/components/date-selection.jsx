import { useQueryClient } from '@tanstack/react-query';
import { addMonths, format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

import { DatePickerWithRange } from './date-picker-with-range';

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd');

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };
  const from = searchParams.get('from'); // YYYY-MM-DD
  const to = searchParams.get('to'); // YYYY-MM-DD
  // Caso não existam ou sejam inválidos os parâmetros na URL, retorna as datas padrão
  if (!from || !to) {
    return defaultDate;
  }
  // Verifica se as datas obtidas da URL são válidas
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to));
  if (datesAreInvalid) {
    return defaultDate;
  }
  // Retorna as datas obtidas da URL, que são válidas
  return {
    from: new Date(from),
    to: new Date(to),
  };
};

const DateSelection = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [date, setDate] = useState(getInitialDateState(searchParams));

  // 1. sempre que o state "date" mudar, eu preciso persisti-lo na URL (?from&to)
  useEffect(() => {
    // early return
    if (!date?.from || !date?.to) return;
    const queryParams = new URLSearchParams();
    queryParams.set('from', formatDateToQueryParam(date.from)); // YYYY-MM-DD
    queryParams.set('to', formatDateToQueryParam(date.to)); // YYYY-MM-DD
    navigate(`/?${queryParams.toString()}`);
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user?.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
    });
  }, [navigate, date, queryClient, user?.id]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
