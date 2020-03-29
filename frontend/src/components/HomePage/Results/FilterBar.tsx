import React, { useState } from "react";
import results from "../../../mocks/organizations.json";
import OrganizationResultItem from "./OrganizationListItem";
import { Divider, TextField, Button } from "@material-ui/core";

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
        onBlur={e => onFilterChange(...filters, { zipcode: e.target.value })}
      />
    </div>
  );
}
