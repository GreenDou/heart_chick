export interface WeatherResult {
  location: {
    id: string,
    name: string,
    country: string,
    path: string,
    timezone: string,
    timezone_offset: string,
  },
  now: {
    text: string,
    code: string,
    temperature: string,
  },
  last_update: string,
}

export const WEATHER_CODE = [
  'Sunny',
  'Clear',
  'Fair',
  'Fair',
  'Cloudy',
];
