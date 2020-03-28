import {MarkerType} from './MarkerType';

export type MapType = {
    latitude: number;
    longitude: number;
    markers: Array<MarkerType>;
}