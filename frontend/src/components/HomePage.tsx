import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
export default function HomePage() {
  const history = useHistory();

  return (
    <div style={styles.container}>
      <h1>SPREAD HELP</h1>
      <Button variant="outlined" onClick={() => history.push("/organizations")}>
        View organizations
      </Button>
    </div>
  );
}
