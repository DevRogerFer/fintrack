import { useQueryClient } from '@tanstack/react-query';
import { addMonths, format, isValid, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

import { DatePickerWithRange } from './date-picker-with-range';

const DATE_FORMAT = 'yyyy-MM-dd';

const formatDateToQueryParam = (date) => format(date, DATE_FORMAT);

// new Date(str) é permissivo demais (ex.: "123" vira o ano 123), por isso usamos
// parse com formato estrito e conferimos se o resultado bate com o texto original
const parseDateParam = (value) => {
  if (!value) return null;
  const parsedDate = parse(value, DATE_FORMAT, new Date());
  if (!isValid(parsedDate) || formatDateToQueryParam(parsedDate) !== value) {
    return null;
  }
  return parsedDate;
};

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };
  const from = parseDateParam(searchParams.get('from')); // YYYY-MM-DD
  const to = parseDateParam(searchParams.get('to')); // YYYY-MM-DD
  // Caso não existam ou sejam inválidos os parâmetros na URL, retorna as datas padrão
  if (!from || !to) {
    return defaultDate;
  }
  return { from, to };
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
