export interface City {
  code: string;
  name: string;
}

export interface CityMap {
  [key: string]: City;
}
