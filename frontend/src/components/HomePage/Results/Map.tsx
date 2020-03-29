import React, { PureComponent, useState } from "react";
import ReactMapGL from "react-map-gl";

import Marker from "./Marker";
import { MapType } from "../../../types/MapType";
import { MarkerType } from "../../../types/MarkerType";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY3JvbmciLCJhIjoiY2s4YjEyNGF3MDFmdjNsbnBuaWM2NmdwMyJ9.Pso27wGxMg-882P8r7PB2g";

type MarkersType = {
  markers: Array<MarkerType>;
};

// Component ensures that the markers are only rerendered when data changes
class Markers extends PureComponent<MarkersType> {
  render() {
    const { markers } = this.props;
    return markers.map(marker => (
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        onClick={() => {}}
      />
    ));
  }
}

const Map = ({ latitude, longitude, markers }: MapType) => {
  const [viewport, setViewport] = useState({
    width: "100%", // or px
    height: "100%", // or px
    latitude: latitude,
    longitude: longitude,
    zoom: 10
  });

  // Map Style: https://docs.mapbox.com/mapbox-gl-js/style-spec/root/#pitch
  return (
    <ReactMapGL
      {...viewport}
      // @ts-ignore - due to react-map-gl type
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <Markers markers={markers} />
    </ReactMapGL>
  );
};

export default Map;
