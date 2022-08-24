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

    addRole(title, salary, departmentId) {
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?, ?, ?)`
        const params = [title, salary, departmentId];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteRole(roleId) {
        let sql = `UPDATE employee SET role_id = null WHERE rold_id = ?`

        db.query(sql, roleId, (err, res) => {
            if (err) {
                console.log(err);
            }
        });

        sql = `DELETE FROM role WHERE id = ?`

        db.query(sql, roleId, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = Role;