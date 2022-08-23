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

    deleteDepartment() {
        const sql = `DELETE FROM department WHERE ?`;
        const params = [this.id];

        db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = Department;