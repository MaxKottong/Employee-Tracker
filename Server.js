const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

//let employee/role/department = new Employee/Role/Department??
let employee = new Employee;
let role = new Role;
let department = new Department;

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
        "View All Departments",
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
                employee.printEmployees();
                start();
                break;
            case "View All Roles":
                role.printRoles();
                start();
                break;
            case "View All Departments":
                department.printDepartments();
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
                process.exit();
                break;
            default:
                console.log(`Action (${data.action}) is not supported.`);
                start();
                break;
        }
    });
}

//addDepartment function
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new department?'
    })
        .then(data => {
            department.addDepartment(data.deptName);
            start();
        })
}

//addRole function
function addRole() {
    const deptChoices = department.

    inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department should this role belong to?',
            choices: deptChoices
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the role title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: input => {
                if (isNaN(input)) {
                    console.log("You did not enter a valid salary")
                    return false;
                }

                return true;
            }
        }
    ])
        .then(data => {
            role.addRole(data.roleName);
            start();
        })
}

//addEmployee function
function addEmployee() {
    inquirer.prompt({
        type: 'input',
        name: 'employeeName',
        message: 'What is the name of the new employee?'
    })
        .then(data => {
            employee.addEmployee(data.employeeName);
            start();
        })
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