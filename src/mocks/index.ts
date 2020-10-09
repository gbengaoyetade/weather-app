export const citiesMock = {
  base: "stations",
  clouds: {all: 0},
  cod: 200,
  coord: {lon: 116.4, lat: 39.91},
  dt: 1602226045,
  id: 1816670,
  main: {temp: 23.52, feels_like: 22.22, temp_min: 23.33, temp_max: 23.89, pressure: 1014, humidity: 47},
  name: "Beijing",
  sys: {type: 3, id: 2000022, country: 'CN', sunrise: 1602195502, sunset: 1602236679},
  timezone: 28800,
  visibility: 10000,
  weather: [{id: 800, main: "Clear", description: "clear sky", icon: "01d"}],
  wind: {speed: 2.55, deg: 209},
};

export const initialStateMock =  {
  favorites: { 'Beijing': { data: citiesMock } },
  weatherInfo: [],
  notes: { 'Beijing': 'hello world' },
  isLoading: false
}