export const spaceToPlusConverter = (value: String) => {
  if (value) {
    return value.replace(/\s/g, "+")
  }
}
