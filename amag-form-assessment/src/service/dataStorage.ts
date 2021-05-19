import Cookies from 'js-cookie'
import {DataObj} from '../interfaces/interfaces'

export function storeFormData(auditLog: DataObj[]) {
  Cookies.set("auditLog", JSON.stringify(auditLog))
}

export function getFormData(): DataObj[]{
  let getData = Cookies.get("auditLog")
  let formDataArr = []
  if(getData){
    formDataArr = JSON.parse(getData)
  }
  return formDataArr
}