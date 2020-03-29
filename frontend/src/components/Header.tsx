import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "absolute",
    width: "100%"
  },
  header: {
    display: "flex",
    padding: "48px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px"
  }
};

type HeaderProps = {
  isWhiteBackground?: boolean;
};

export default function HeaderProps({
  isWhiteBackground = false
}: HeaderProps) {
  let history = useHistory();
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>
          <AddIcon />
          <Typography
            variant="h2"
            color={isWhiteBackground ? "primary" : "textSecondary"}
            style={{ margin: 0 }}
          >
            Helper Zero
          </Typography>
        </span>
        <Button
          size="large"
          variant="text"
          color={"secondary"}
          onClick={() => history.push("/receiver/signup")}
        >
          Request Aid
        </Button>
      </div>
    </div>
  );
}
