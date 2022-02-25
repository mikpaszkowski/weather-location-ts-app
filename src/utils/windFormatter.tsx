export type WindDirectionShortcuts = {
  [name: string]: string
}

export const windDirectionShortcutsMap: WindDirectionShortcuts = {
  "N": "North",
  "NNE": "North-Northeast",
  "NE": "Northeast",
  "ENE": "East-Northeast",
  "E": "East",
  "ESE": "East-Southeast",
  "SE": "Southeast",
  "SSE": "South-Southeast",
  "SSW": "South-Southwest",
  "SW": "Southwest",
  "WSW": "West-Southwest",
  "W": "West",
  "WNW": "West-Northwest",
  "NW": "Northwest",
  "NNW": "North-Northwest"
};

export const getWindDirection = (windDeg: number): string => {
  if (windDeg >= 348.75 && windDeg < 11.25) {
    return "N";
  } else if (windDeg >= 11.25 && windDeg < 33.75) {
    return "NNE";
  } else if (windDeg >= 33.75 && windDeg < 56.25) {
    return "NE";
  } else if (windDeg >= 56.25 && windDeg < 78.75) {
    return "ENE";
  } else if (windDeg >= 78.75 && windDeg < 101.25) {
    return "E";
  } else if (windDeg >= 101.25 && windDeg < 123.75) {
    return "ESE";
  } else if (windDeg >= 123.75 && windDeg < 146.25) {
    return "SE";
  } else if (windDeg >= 146.25 && windDeg < 168.75) {
    return "SSE";
  } else if (windDeg >= 168.75 && windDeg < 191.25) {
    return "S";
  } else if (windDeg >= 191.25 && windDeg < 213.75) {
    return "SSW";
  } else if (windDeg >= 213.75 && windDeg < 236.25) {
    return "SW";
  } else if (windDeg >= 236.25 && windDeg < 258.75) {
    return "WSW";
  } else if (windDeg >= 258.75 && windDeg < 281.25) {
    return "W";
  } else if (windDeg >= 281.25 && windDeg < 303.75) {
    return "WNW";
  } else if (windDeg >= 303.75 && windDeg < 326.25) {
    return "NW";
  }
  return "NNW";
};