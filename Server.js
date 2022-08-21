const db = require('./utils/Database');
const PORT = process.env.PORT || 3001;
const inquirer = require('inquirer');
const mysql = require('mysql2');
const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

//Start function -- Asks what you want to do, then takes the data from the response, creates a switch for each selection,
//and each selection starts its own function.

//addDepartment function

//addRole function

//addEmployee function

//updateEmployeeRole function

//updateEmployeeManager function

//removeEmployee function

//removeRole function

//remove department function

//call start function (each separate function will call start at the end so you can return to the menu)
