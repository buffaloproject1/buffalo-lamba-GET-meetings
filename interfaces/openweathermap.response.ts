export interface OpenWeatherSys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number
}

export interface OpenWeatherCloud {
  all: number;
}

export interface OpenWeatherWind {
  speed: number;
  deg: number;
}

export interface OpenWeatherMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number
}

export interface OpenWeather_Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: OpenWeather_Weather[];
  base: string;
  main: OpenWeatherMain;
  visibility: number;
  wind: OpenWeatherWind;
  clouds: OpenWeatherCloud;
  dt: number;
  sys: OpenWeatherSys;
  id: number;
  name: string;
  cod: number;
}