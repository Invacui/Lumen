import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters, setFilter, type FiltersState } from '@/store/filters.slice';

const DEFAULT_FILTERS: FiltersState = {
  type: 'all',
  category: 'all',
  dateFrom: null,
  dateTo: null,
  search: '',
};

function getQueryValue(value: string | null): string | null {
  return value && value.trim().length > 0 ? value : null;
}

function parseFromUrl(searchParams: URLSearchParams): Partial<FiltersState> {
  const parsed: Partial<FiltersState> = {};
  const type = getQueryValue(searchParams.get('type'));
  const category = getQueryValue(searchParams.get('category'));
  const search = getQueryValue(searchParams.get('search'));
  const dateFrom = getQueryValue(searchParams.get('dateFrom'));
  const dateTo = getQueryValue(searchParams.get('dateTo'));

  if (type) parsed.type = type as FiltersState['type'];
  if (category) parsed.category = category as FiltersState['category'];
  if (search) parsed.search = search;
  if (dateFrom) parsed.dateFrom = dateFrom;
  if (dateTo) parsed.dateTo = dateTo;

  return parsed;
}

export function useTransactionFiltersUrl() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const didHydrateFromUrl = useRef(false);

  useEffect(() => {
    if (didHydrateFromUrl.current) return;
    didHydrateFromUrl.current = true;
    const parsed = parseFromUrl(searchParams);
    if (Object.keys(parsed).length > 0) {
      dispatch(setFilter(parsed));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!didHydrateFromUrl.current) return;
    const next = new URLSearchParams();

    if (filters.type !== DEFAULT_FILTERS.type) next.set('type', filters.type);
    if (filters.category !== DEFAULT_FILTERS.category) next.set('category', filters.category);
    if (filters.search.trim()) next.set('search', filters.search.trim());
    if (filters.dateFrom) next.set('dateFrom', filters.dateFrom);
    if (filters.dateTo) next.set('dateTo', filters.dateTo);

    setSearchParams(next, { replace: true });
  }, [filters, setSearchParams]);
}
