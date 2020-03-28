import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Map from './Map';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
};

//TODO: remove once there is a real data
const MARKERS = [{
  key: 'yelp',
  latitude: 37.7865,
  longitude: -122.4000,
  
}, {
  key: 'airbnb',
  latitude: 37.7717,
  longitude: -122.4054,
}];


export default function HomePage() {
  const history = useHistory();

  return (
    <div style={styles.container}>
      <h1>SPREAD HELP</h1>
      <Button variant="outlined" onClick={() => history.push("/organizations")}>
        View organizations
      </Button>
      <Map
        latitude={37.7577}
        longitude={-122.4376}
        markers={MARKERS}
      />
    </div>
  );
}
