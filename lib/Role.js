const db = require('../db/connection');

class Role {
    printRoles() {
        const sql = `SELECT r.id, r.title, d.name, r.salary
                    FROM role r
                    LEFT JOIN department d ON r.department_id = d.id`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(res);
        });
    }

    addRole(roleObj) {
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?, ?, ?)`
        const params = [roleObj.title, roleObj.salary, roleObj.department_id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateRole() {
        const sql = `UPDATE role SET ? WHERE ?`
        const params = [this.title, this.salary, this.departmentId, this.id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteRole(id) {
        const sql = `DELETE FROM role WHERE ?`
        const params = [this.id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    getRoles() {

    }
}

module.exports = Role;