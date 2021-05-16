const settings = {
  dev: {
    apiUrl: "https://maps.googleapis.com/maps/api/geocode/json?address=",
  },
  prod: {
    apiUrl: "",
  },
}

const getSettings = (environment: string) => {
  return environment === "dev" ? settings.dev : settings.prod
}

export default getSettings
