import React from "react";
import results from "../../../mocks/organizations.json";
import OrganizationResultItem from "./OrganizationListItem";
import { Divider } from "@material-ui/core";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "64px"
  },
  separatorLine: {
    margin: "36px 0px"
  }
};

type FilterBarProps = {
  organizations: any[];
};
export default function FilterBar({
  organizations
}: FilterBarProps) {
    
  return (
    <div />
  );
}
