import React from "react";
import results from "../../../mocks/organizations.json";
import OrganizationResultItem from "./OrganizationListItem";
import { Divider } from "@material-ui/core";
import FilterBar from "./FilterBar";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "64px"
  },
  separatorLine: {
    margin: "36px 0px"
  },
  filtersContainer: {
    marginBottom: "24px"
  }
};

type ResultsContainerProps = {
  onFilterChange: Function;
  organizations: any[];
};

export default function ResultsContainer({
  onFilterChange,
  organizations
}: ResultsContainerProps) {
  return (
    <div style={styles.container}>
      <div style={styles.filtersContainer}>
        <FilterBar onFilterChange={onFilterChange} />
      </div>
      {organizations.map((organization, index) => (
        <>
          <OrganizationResultItem organization={organization} />
          {index !== organizations.length - 1 && (
            <span style={styles.separatorLine}>
              <Divider />
            </span>
          )}
        </>
      ))}
    </div>
  );
}
