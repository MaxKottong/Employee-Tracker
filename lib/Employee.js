const db = require('../db/connection');

class Employee {

    printEmployees() {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
                    FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    LEFT JOIN employee m ON e.manager_id = m.id`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(res);
        })
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
        const params = [firstName, lastName, roleId, managerId];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    //updateEmployee(id, firstName, lastName, roleId) {
    //    const sql = `UPDATE employee SET ? WHERE ?`;
    //    const params = [{ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }, { id: id }];

    //    db.query(sql, params, (err, res) => {
    //        if (err) {
    //            console.log(err);
    //        }
    //    });
    //}

    updateRole(employeeId, roleId) {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [roleId, employeeId];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateManager(employeeId, managerId) {
        const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
        const params = [managerId, employeeId];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteEmployee(id) {
        const sql = `DELETE FROM employee WHERE id = ?`;
        const params = [this.id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    getEmployees() {

    }
}

module.exports = Employee;