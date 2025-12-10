import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { PaginatedType } from './types';

const pageOptions = [
  { value: 10, label: '10 Rows' },
  { value: 20, label: '20 Rows' },
  { value: 50, label: '50 Rows' },
];

const usePaginationWrapper = (defaultLimit = 20) => {
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const [pageable, setPageable] = useState<PaginatedType<any>>();

  const resetPagination = () => {
    setPage(1);
    setLimit(defaultLimit);
  };

  useEffect(() => {
    if (pageable) {
      setTotalPages(pageable.totalPages);
      setPage(Number(pageable.page || '1'));
      setTotalElements(pageable.totalElements);
    }
  }, [pageable]);

  useEffect(() => {
    setPage(1);
    setLimit(defaultLimit);
  }, [debouncedSearchText, defaultLimit]);

  return {
    limit,
    setTotalPages,
    setLimit,
    totalElements,
    totalPages,
    page,
    setPage,
    pageOptions,
    searchText,
    debouncedSearchText,
    setSearchText,
    setTotalElements,
    resetPagination,
    setPageable,
  };
};

export default usePaginationWrapper;
