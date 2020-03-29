// @ts-nocheck
import React from 'react';
import { BaseControl } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';

import { MarkerType } from '../../../types/MarkerType';

class Marker extends BaseControl<any, MarkerType> {
  _render() {
    const {longitude, latitude, onClick} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      // To center the marker in the map, we need to substract appropiate size of the map marker
      left: x - 17.5, // half width size of the marker
      top: y - 35, // full height size of the marker
    };

    return (
      <div ref={this._containerRef} style={markerStyle} onClick={onClick}>
        <RoomIcon fontSize="large"/>
      </div>
    );
  }
}

export default Marker;