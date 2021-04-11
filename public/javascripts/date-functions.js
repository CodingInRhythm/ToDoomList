const dateConverter = (integer) => {
    if (integer === 0 || integer === 7)
    {return 'Sun'}
    if (integer === 1 || integer === 8) {
      return "Mon";
    }
    if (integer === 2 || integer === 9) {
      return "Tues";
    }
    if (integer === 3 || integer === 10) {
      return "Wed";
    }
    if (integer === 4 || integer === 11) {
      return "Thurs";
    }
    if (integer === 5 || integer === 12) {
      return "Fri";
    }
    if (integer === 6 || integer === 13) {
      return "Sat";
    }    
}

const setDate = (date, number) => {
  let newDateObj = new Date(date)
  newDateObj.setDate(newDateObj.getDate() + number)
  return newDateObj
}

const dateStringFormatter = (unformattedDate) => {
  let year = unformattedDate.getFullYear()
  let month = unformattedDate.getMonth() + 1
  let date = unformattedDate.getDate()
  if (month < 10) {
    return `${year}-0${month}-${date}`
  } 
  else {
  return `${year}-${month}-${date}`
  }
}

console.log(dateConverter(10))
export {
    dateConverter,
    dateStringFormatter,
    setDate
}