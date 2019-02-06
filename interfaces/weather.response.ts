export interface WeatherResponseCurrentCondition {
  description: string;
  icon: string;
}

export interface WeatherResponse {
  currentTemperature: number;
  highTemperature: number;
  lowTemperature: number;
  backgroundImage: string;
  currentCondition: WeatherResponseCurrentCondition;
  advice: string;
}