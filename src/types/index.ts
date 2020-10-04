export interface CityDetails {
  base: string
  clouds: { all: number }
  cod: number
  coor: { lon: number, lat: number }
  dt: number
  id: number
  main: CityMain
  name: string
  rain: { [key: string]: number }
  sys: { type: number, id: number, country: string, sunrise: number, sunset: number }
  timezone: number
  visibility: number
  weather: [{ id: number, main: string, description: string, icon: string }]
  wind: { speed: number, deg: number, gust: number }
}

export interface CityMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface WeatherInfo {
  data: CityDetails
}