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
    padding: "48px 48px 24px 48px",
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
  signedIn?: boolean
};

export default function HeaderProps({
  isWhiteBackground = false,
  signedIn = false,
}: HeaderProps) {
  let history = useHistory();
  return (
    <div
      style={{
        ...styles.container,
        borderBottom: isWhiteBackground ? "1px solid #D4DBEE" : "none"
      }}
    >
      <div style={styles.header}>
        <span style={styles.logo}>
          <AddIcon
            style={{ color: isWhiteBackground ? "384555" : "#EFF6FF" }}
          />
          <Button
            onClick={() => history.push("/")}
          >
            <Typography
              variant="h2"
              style={{
                margin: 0,
                color: isWhiteBackground ? "384555" : "#EFF6FF"
              }}
            >
              Port.er
            </Typography>
          </Button>
        </span>
        <Button
          size="large"
          variant="text"
          color={"secondary"}
          onClick={() => history.push("/organization/login")}
        >
          Request Aid
        </Button>
      </div>
    </div>
  );
}
