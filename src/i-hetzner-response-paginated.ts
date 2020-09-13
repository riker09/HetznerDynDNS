export interface HetznerResponsePaginated<T> {
  records: T[],
  meta: {
    pagination: {
      page: number;
      per_page: number;
      last_page: number;
      total_entries: number;
    }
  }
}