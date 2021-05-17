import {DataObj} from '../interfaces/interfaces'

export function storeFormData(auditLog: DataObj[]) {
  localStorage.setItem("auditLog", JSON.stringify(auditLog));
}

export function getFormData():DataObj[]{
  let getData = localStorage.getItem("auditLog")
  let formDataArr: DataObj[] = []
  if(getData){
    formDataArr = JSON.parse(getData)
  }
  return formDataArr
}