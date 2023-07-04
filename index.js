// // Your code here
function createEmployeeRecord(employeeData) {
  const employeeRecord = {};
  employeeRecord.firstName = employeeData[0];
  employeeRecord.familyName = employeeData[1];
  employeeRecord.title = employeeData[2];
  employeeRecord.payPerHour = employeeData[3];
  employeeRecord.timeInEvents = [];
  employeeRecord.timeOutEvents = [];
  return employeeRecord;
}
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}
function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });

  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);

  const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const ratePerHour = employee.payPerHour;
  const wagesEarned = hoursWorked * ratePerHour;
  return wagesEarned;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map((event) => event.date);
  const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
