const Department = require('./Department');
const Role = require('./Role');

class Employee {
    constructor(db, id = 0, firstName = "", lastName = "", roleId = 0, managerId = 0) {
        this.db = db;
        this.id = id;
        this.first_name = firstName;
        this.last_name = lastName;
        this.role_id = roleId;
        this.manager_id = managerId;
    }

    printEmployees() {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
                    FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    LEFT JOIN employee m ON e.manager_id = m.id`;

        this.db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(res);
        })
    }

    addEmployee(firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
        const params = [firstName, lastName, roleId, managerId];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
    //HELP
    updateEmployee(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        const sql = `UPDATE employee SET ? WHERE ?`;
        const params = []

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteEmployee() {
        const sql = `DELETE FROM employee WHERE id = ?`;
        const params = [this.id];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

}

module.exports = Employee;