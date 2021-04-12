
//converts a date integer into a string representing corresponding date
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


/*takes in a date and a number of days to offset the date by to allow for 
setting a date in the future (i.e. tomorrow, day after tomorrow etc.).  Returns
the new date Obj for that date.
*/


const setDate = (date, number) => {
  let newDateObj = new Date(date)
  newDateObj.setDate(newDateObj.getDate() + number)
  return newDateObj
}

/*
Formats a date object into a string that can be passed into the application's db.
*/


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

/*
takes in an unformatted Date string and returns a UI-friendly string for display.  
*/
const formatDate = (unformattedDate) => {
  //only works for sequelize.DATE formatting
  const justDate = unformattedDate.split("T")[0];
  const monthNum = justDate.split("-")[1];
  let month = "";
  if (monthNum === "01") month = "Jan";
  if (monthNum === "02") month = "Feb";
  if (monthNum === "03") month = "Mar";
  if (monthNum === "04") month = "Apr";
  if (monthNum === "05") month = "May";
  if (monthNum === "06") month = "June";
  if (monthNum === "07") month = "July";
  if (monthNum === "08") month = "Aug";
  if (monthNum === "09") month = "Sept";
  if (monthNum === "10") month = "Oct";
  if (monthNum === "11") month = "Nov";
  if (monthNum === "12") month = "Dec";

  const date = justDate.split("-")[2];
  return `${month} ${date}`;
};

export {
    dateConverter,
    dateStringFormatter,
    setDate,
    formatDate
}