import React from "react";
import { TextField } from "@material-ui/core";

const styles: { [key: string]: React.CSSProperties } = {};

type FilterBarProps = {
  filters?: any;
  onFilterChange: Function;
};
export default function FilterBar({
  filters = {},
  onFilterChange
}: FilterBarProps) {
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Zip Code"
        onBlur={e => onFilterChange({ ...filters, zipcode: e.target.value, })}
      />
    </div>
  );
}
