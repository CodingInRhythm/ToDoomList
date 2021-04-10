const formatDate = (unformattedDate) => {


    //only works for sequelize.DATE formatting
    const justDate = unformattedDate.split("T")[0]
    const monthNum = justDate.split("-")[1]
    let month = ''
    if (monthNum === '01') month = 'Jan'
    if (monthNum === '02') month = 'Feb'
    if (monthNum === '03') month = 'Mar'
    if (monthNum === '04') month = 'Apr'
    if (monthNum === '05') month = 'May'
    if (monthNum === '06') month = 'June'
    if (monthNum === '07') month = 'July'
    if (monthNum === '08') month = 'Aug'
    if (monthNum === '09') month = 'Sept'
    if (monthNum === '10') month = 'Oct'
    if (monthNum === '11') month = 'Nov'
    if (monthNum === '12') month = 'Dec'

    const date = justDate.split("-")[2]
    return `${month} ${date}`
        
}

export {
    formatDate
}