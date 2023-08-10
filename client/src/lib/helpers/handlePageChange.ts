import { Direction } from "../types/Direction";

export const handlePageChange = (
  event: React.ChangeEvent<unknown>,
  page: number,
  setPage: any,
  setSearchParams: any,
  field: string,
  direction: Direction
) => {
  setPage(page);
  setSearchParams({ page: page.toString(), field, direction });
};
