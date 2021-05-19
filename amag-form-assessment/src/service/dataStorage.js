import Cookies from 'js-cookie' 
import reactiveJsonFile from 'reactive-json-file'

export function storeFormData(auditLog) {
  // localStorage.setItem("auditLog", JSON.stringify(auditLog));
  Cookies.set("auditLog", JSON.stringify(auditLog))
  const object = reactiveJsonFile('./data.json')
  object.name = "hello"
}

export function getFormData(){
  // let getData = localStorage.getItem("auditLog")
  let getData = Cookies.get("auditLog")
  let formDataArr = []
  if(getData){
    formDataArr = JSON.parse(getData)
  }
  return formDataArr
}