import React from "react";
import Map from './Map';
import Marquee from "./Marquee";

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
  return (
    <div style={styles.container}>
      <Marquee />
      <Map
        latitude={37.7577}
        longitude={-122.4376}
        markers={MARKERS}
      />
    </div>
  );
}
