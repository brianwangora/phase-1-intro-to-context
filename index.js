function createEmployeeRecord(array) {
    return {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords (nestedArray) {
    return nestedArray.map(function(array){return createEmployeeRecord(array)})    
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let newDateStamp = dateStamp.split(/(\s+)/)
    employeeRecord.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(newDateStamp[2]), 
        date: newDateStamp[0],
    })
    return employeeRecord
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    let newDateStamp = dateStamp.split(/(\s+)/)
    employeeRecord.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(newDateStamp[2]), 
        date: newDateStamp[0],
    })
    return employeeRecord
}

function hoursWorkedOnDate (employeeRecord, dateWorked) {
    let timeIn = employeeRecord.timeInEvents.find(function(event) {
        return event.date === dateWorked
    })
    let timeOut = employeeRecord.timeOutEvents.find(function(event) {
        return event.date === dateWorked
    })
    return ((timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate (employeeRecord, dateWorked) {
    let wagesEarned = hoursWorkedOnDate(employeeRecord,dateWorked) * employeeRecord.payPerHour
    return parseFloat(wagesEarned)
}

function allWagesFor (employeeRecord) {
   let relevantDates = employeeRecord.map(function (count) { 
        return count.date
    })
    let amount = relevantDates.reduce( function (total, dateWorked) {
        total + wagesEarnedOnDate(employeeRecord, dateWorked)
    },0)
    return amount
}

function calculatePayroll (employeeRecords) {
    return employeeRecords.reduce(
        function (total, allEmployees) {
            return total + allWagesFor(allEmployees)
        },0)
}