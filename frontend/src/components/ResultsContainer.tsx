import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import results from '../mocks/organizations.json';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
export default function ResultsContainer() {
  const history = useHistory();
	console.log(results);
  return (
    <div style={styles.container}>
      <h1>Filters</h1>
      <Button variant="outlined" onClick={() => history.push("/organizations")}>
        View organizations
      </Button>
    </div>
  );
}
