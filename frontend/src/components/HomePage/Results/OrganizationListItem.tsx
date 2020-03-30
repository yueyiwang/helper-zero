import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Typography, lighten } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { OrganizationType } from "../../../types/OrganizationType.js";
import { withStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
const ProgressBar = withStyles({
  root: {
    height: 20,
    backgroundColor: lighten("#405CC0", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#405CC0"
  }
})(LinearProgress);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  nameContainer: {
    display: "flex",
    alignItems: "center"
  },
  rowItem: {
    marginBottom: "24px"
  },
  requestItem: {
    display: "flex",
    justifyContent: "space-between"
  }
};

type OrganizationResultItemProps = {
  organization: OrganizationType;
};

export default function OrganizationResultItem({
  organization
}: OrganizationResultItemProps) {
  const history = useHistory();
  return (
    <div style={styles.container}>
      <div style={styles.nameContainer}>
        <Typography variant={"h2"} style={{ margin: 0 }}>
          {organization.name}
        </Typography>
        <IconButton onClick={() => window.open(organization.url, "_blank")}>
          <LinkIcon color={"primary"} />
        </IconButton>
      </div>
      <div style={styles.rowItem}>
        <Typography variant={"body1"}>{organization.address}</Typography>
      </div>
      {organization.donation_requests && organization.donation_requests.map(donation_request => (
        <>
          <div style={styles.rowItem}>
            <div style={styles.requestItem}>
              <Typography variant="h4">{donation_request.item_type}</Typography>
              <Typography variant="body1">{`${donation_request.amount_received}/${donation_request.amount_requested} asked`}</Typography>
            </div>
            <ProgressBar
              variant="determinate"
              value={
                (donation_request.amount_received /
                  donation_request.amount_requested) *
                100
              }
            />
          </div>
        </>
      ))}
      <span>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          onClick={() => history.push(`/donator/${organization.id}`)}
        >
          Donate
        </Button>
      </span>
    </div>
  );
}
