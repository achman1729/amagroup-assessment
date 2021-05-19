import Cookies from "js-cookie"
import { DataObj } from "../interfaces/interfaces"

const dataStorageService = {
  storeFormData: (auditLog: DataObj[]) => {
    Cookies.set("auditLog", JSON.stringify(auditLog))
  },

  getFormData: (): DataObj[] => {
    let getData = Cookies.get("auditLog")
    let formDataArr = []
    if (getData) {
      formDataArr = JSON.parse(getData)
    }
    return formDataArr
  },
}

export default dataStorageService
