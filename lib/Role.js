class Role {
    constructor(db, id = 0, title = "", salary = 0.00, departmentId = 0) {
        this.db = db;
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = departmentId;
    }

    printRoles() {
        const sql = `SELECT r.id, r.title, d.name, r.salary
                    FROM role r
                    LEFT JOIN department d ON r.department_id = d.id`;

        this.db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(res);
        });
    }

    addRole(title = this.title, salary = this.salary, departmentId = this.department_id) {
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?, ?, ?)`
        const params = [title, salary, departmentId];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateRole() {
        const sql = `UPDATE role SET ? WHERE ?`
        const params = [this.title, this.salary, this.departmentId, this.id];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteRole() {
        const sql = `DELETE FROM role WHERE ?`
        const params = [this.id];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = Role;