import { Pagination } from "@mui/material";
import { Direction } from "../../lib/types/Direction";
import { IPageableResponse } from "../../lib/types/Response";
import { IPizza } from "../../lib/types/IPizza";
import { IIngredient } from "../../lib/types/IIngredient";
import { IOperation } from "../../lib/types/IOperation";
import { SetURLSearchParams } from "react-router-dom";

interface DefaultPaginationProps {
  item: IPageableResponse<IPizza | IIngredient | IOperation>;
  field: string;
  direction: Direction;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: SetURLSearchParams;
}

export const DefaultPagination = ({
  item,
  field,
  direction,
  page,
  setPage,
  setSearchParams,
}: DefaultPaginationProps) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    setSearchParams({ page: page.toString(), field, direction });
  };

  return (
    <Pagination
      count={Math.ceil(item.meta.total / 10)}
      page={+page}
      onChange={handlePageChange}
      color="primary"
      showFirstButton
      showLastButton
      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
    />
  );
};
