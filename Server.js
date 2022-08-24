const inquirer = require('inquirer');
const db = require('./db/connection');
const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

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
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Remove Employee, Department or Role",
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
            case "Remove Employee, Department or Role":
                remove();
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
    let departments = ['No department'];

    db.query('SELECT * FROM department',
        function (err, res) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].name) {
                    departments.push(res[i].name);
                }
            }

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'departmentName',
                    choices: departments,
                    message: 'Which department should this role belong to?'
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the role title?'
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
                .then((data) => {
                    let departmentId = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].name == data.departmentName) {
                            departmentId = res[i].id;
                            break;
                        }
                    }
                    role.addRole(data.title, data.salary, departmentId);
                    start();
                });
        }
    );
}

//addEmployee function
function addEmployee() {
    let roles = ['No Role'];
    let managers = ['No Manager'];

    db.query("SELECT * FROM role ",
        function (err, roleRes) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < roleRes.length; i++) {
                if (roleRes[i].title) {
                    roles.push(roleRes[i].title);
                }
            }

            db.query("SELECT * from employee ",
                function (err, empRes) {
                    if (err) console.log(err);
                    for (let i = 0; i < empRes.length; i++) {
                        if (empRes[i].first_name) {
                            managers.push(empRes[i].first_name + " " + empRes[i].last_name);
                        }
                    }

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first',
                            message: `Enter the new employee's first name`
                        },
                        {
                            type: 'input',
                            name: 'last',
                            message: `Enter the new employee's last name`
                        },
                        {
                            type: 'list',
                            name: 'role',
                            choices: roles,
                            message: `Select the employee's new role`
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            choices: managers,
                            message: 'Which employee will be their manager?'
                        }
                    ])
                        .then(data => {
                            let roleId = null;
                            for (let i = 0; i < roleRes.length; i++) {
                                if (roleRes[i].title == data.role) {
                                    roleId = roleRes[i].id;
                                    break;
                                }
                            }

                            let managerId = null;
                            for (let i = 0; i < empRes.length; i++) {
                                if (empRes[i].first_name + " " + empRes[i].last_name == data.manager) {
                                    managerId = empRes[i].id;
                                    break;
                                }
                            }
                            employee.addEmployee(data.first, data.last, roleId, managerId);
                            start();
                        });
                }
            );
        }
    );
}

//updateEmployeeRole function
function updateEmployeeRole() {
    let roles = ['No Role'];
    let employees = [];

    db.query(`SELECT * FROM role`,
        function (err, roleRes) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < roleRes.length; i++) {
                if (roleRes[i].title) {
                    roles.push(roleRes[i].title);
                }
            }

            db.query(`SELECT * FROM employee`,
                function (err, empRes) {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < empRes.length; i++) {
                        if (empRes[i].first_name) {
                            employees.push(empRes[i].first_name + " " + empRes[i].last_name);
                        }
                    }

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employeeName',
                            choices: employees,
                            message: 'Select an employee to update'
                        },
                        {
                            type: 'list',
                            name: 'role',
                            choices: roles,
                            message: `Select the employee's new role`
                        }
                    ])
                        .then(data => {
                            let roleId = null;
                            for (let i = 0; i < roleRes.length; i++) {
                                if (roleRes[i].title == data.role) {
                                    roleId = roleRes[i].id;
                                    break;
                                }
                            }

                            let employeeId = null;
                            for (let i = 0; i < empRes.length; i++) {
                                let managerId = null;
                                if (empRes[i].first_name + " " + empRes[i].last_name == data.employeeName) {
                                    employeeId = empRes[i].id;
                                    break;
                                }
                            }

                            employee.updateRole(employeeId, roleId);
                            start();
                        });
                }
            )
        }
    )
}

//updateEmployeeManager function
function updateEmployeeManager() {
    let managers = ['No Manager'];
    let employees = [];

    db.query(`SELECT * FROM employee`,
        function (err, res) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name) {
                    employees.push(res[i].first_name + " " + res[i].last_name);
                    managers.push(res[i].first_name + " " + res[i].last_name);
                }
            }

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to upate the manager of?',
                    choices: employees,
                    name: 'employeeName'
                },
                {
                    type: 'list',
                    message: 'Who will be their new manager?',
                    choices: managers,
                    name: 'managerName'
                }
            ])
                .then(data => {
                    let managerId = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].first_name + " " + res[i].last_name == data.managerName) {
                            managerId = res[i].id;
                            break;
                        }
                    }

                    let employeeId = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].first_name + " " + res[i].last_name == data.employeeName) {
                            employeeId = res[i].id;
                            break;
                        }
                    }

                    employee.updateManager(employeeId, managerId);
                    start();
                });
        }
    )
}

function remove() {

    inquirer.prompt({
        type: 'list',
        message: 'What would you like to delete?',
        choices: ['Employee', 'Department', 'Role'],
        name: 'deleteChoice'
    })
        .then(data => {
            switch (data.deleteChoice) {
                case 'Employee':
                    removeEmployee();
                    break;
                case 'Department':
                    removeDepartment();
                    break;
                case 'Role':
                    removeRole();
                    break;
            }

            start();
        })
}

function removeEmployee() {
    let employees = [];

    db.query(`SELECT * FROM employee`,
        function (err, res) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name) {
                    employees.push(res[i].first_name + " " + res[i].last_name);
                }
            }

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to remove?',
                    choices: employees,
                    name: 'employeeName'
                }
            ])
                .then(data => {
                    let employeeId = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].first_name + " " + res[i].last_name == data.employeeName) {
                            employeeId = res[i].id;
                            break;
                        }
                    }

                    employee.removeEmployee(employeeId);
                });
        }
    )
}

function removeDepartment() {
    let departments = [];

    db.query(`SELECT * FROM department`,
        function (err, res) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].id) {
                    departments.push(res[i].id);
                }
            }

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which department would you like to remove?',
                    name: 'deptName'
                }
            ])
                .then(data => {
                    let deptId = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].id == data.deptName) {
                            deptId = res[i].id;
                            break;
                        }
                    }

                    department.removeDepartment(deptId);
                });
        }
    )
    //Get list of departments
    //Let user pick a department

    //Look up the departmentId based on the name chosen
    //Call deleteDepartment

}

function removeRole() {
    let roles = [];

    db.query(`SELECT * FROM role`,
        function (err, res) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].id) {
                    roles.push(res[i].id);
                }
            }

            inquirer.promot([
                {
                    type: 'list',
                    message: 'Which role would you like to remove?',
                    name: 'roleName'
                }
            ])
                .then(data => {
                    let roleId = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].id == data.roleName) {
                            roleId = res[i].id;
                            break;
                        }
                    }

                    role.removeRole(roleId);
                })
        }
    )
}

//call start function (each separate function will call start at the end so you can return to the menu)
start();