import axios from "axios"
import getSettings from "../config/settings"
import { spaceToPlusConverter } from "../utils/HelperFuctions"
import { API_KEY } from "../keys/ApiKey"

export async function geoCodeApi(siteName: any): Promise<any> {
  let convertedSiteName = spaceToPlusConverter(siteName)
  let getEnvUrl = getSettings("dev")

  console.log("siteName", siteName)

  return await axios
    .get(`${getEnvUrl.apiUrl}${convertedSiteName}&key=${API_KEY}`)
    .then((response) => response.data.results[0])
    .catch((error) => {
      console.log(error)
    })
}
