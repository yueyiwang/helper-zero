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

type ResultsContainerProps = {
  organizations: any[];
};
export default function ResultsContainer({
  organizations
}: ResultsContainerProps) {
  return (
    <div style={styles.container}>
      <h1>Filters</h1>
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