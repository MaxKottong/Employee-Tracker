const db = require('../db/connection');

class Department {

    printDepartments() {
        const sql = `SELECT d.id, d.name
                    FROM department d`;

        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(res);
        });
    }

    addDepartment(deptName) {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;

        db.query(sql, deptName, (err, res) => {
            if (err) {
                console.log(err);
            }
        })
            
    }

    updateDepartment() {
        const sql = `UPDATE department SET ? WHERE ?`;
        const params = [this.name, this.id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteDepartment(id) {
        const sql = `DELETE FROM department WHERE id = ?`;

        db.query(sql, id, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    getDepartments() {
        const sql = `SELECT * FROM department`;
        let departments = [];

        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < res.length; i++) {
                if (res[i].name) {
                    departments.push(res[i].name);
                }
            }
        })
    }
}

module.exports = Department;