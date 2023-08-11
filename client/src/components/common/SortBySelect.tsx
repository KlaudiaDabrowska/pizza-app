import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Direction } from "../../lib/types/Direction";

type SortingObject = {
  [key: string]: string;
};

interface ISortBySelectParams {
  page: number;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  setField: React.Dispatch<React.SetStateAction<string>>;
  item?: string;
}

export const SortBySelect = ({
  page,
  setDirection,
  setField,
  item,
}: ISortBySelectParams) => {
  const [selectedOption, setSelectedOption] = useState("");
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const sortingArray: SortingObject[] =
    item === "pizza"
      ? [
          { "Name ascending": "name asc" },
          { "Name descending": "name desc" },
          { "Price ascending": "price asc" },
          { "Price descending": "price desc" },
        ]
      : [{ "Name ascending": "name asc" }, { "Name descending": "name desc" }];

  //todo: add multiple sorting
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);

    const selectedObject = sortingArray.find(
      (item) => Object.keys(item)[0] === selectedOption
    );

    if (selectedObject) {
      const selectedValue = selectedObject[selectedOption];
      const [field, direction] = selectedValue.split(" ");
      setField(field);
      setDirection(direction as Direction);
      setSearchParams({ page: page.toString(), field, direction });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1">Sort by: </Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="sortBY"
          id="sortBY"
          value={selectedOption}
          onChange={handleSelectChange}
          label="sortBY"
        >
          {sortingArray.map((item) => {
            const key = Object.keys(item)[0];
            return (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
