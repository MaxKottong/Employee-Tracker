const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

//let employee/role/department = new Employee/Role/Department??

//Start function -- Asks what you want to do, then takes the data from the response, creates a switch for each selection,
//and each selection starts its own function.
function start() {
    let question = "What would you like to do?";
    let options = [
        "View All Employees",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View all departments",
        "Add Department",
        "Remove Department",
        "Exit"
    ];

    inquirer.prompt({
        name: "action",
        type: "list",
        message: question,
        choices: options
    }).then(data => {
        switch (data.action) {
            case "View All Employees":
                Employee.printEmployees();
                start();
                break;
            case "View All Roles":
                Role.printRoles();
                start();
                break;
            case "View All Departments":
                Department.printDepartments();
                start();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Exit":
                console.log("Thank you for using our Employee Tracker.");
                break;
            default:
                console.log(`Action (${data.action}) is not supported.`);
                start();
                break;
        }
        console.log('JIMMY');
    });
}

//addDepartment function
function addDepartment() {

}

//addRole function
function addRole() {

}

//addEmployee function
function addEmployee() {

}

//updateEmployeeRole function
function updateEmployeeRole() {

}

//updateEmployeeManager function
function updateEmployeeManager() {

}

//removeEmployee function
function removeEmployee() {

}

//removeRole function
function removeRole() {

}

//removeDepartment function
function removeDepartment() {

}

//call start function (each separate function will call start at the end so you can return to the menu)
start();