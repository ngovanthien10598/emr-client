export const requiredRule = (message = "Vui lòng điền vào trường này") => {
  return {
    required: true,
    message: message
  }
}