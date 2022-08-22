class Department {
    constructor(db, id = 0, name = "") {
        this.db = db;
        this.id = id;
        this.name = name;
    }

    printDepartments() {
        const sql = `SELECT d.id, d.name
                    FROM department d`;

        this.db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(res);
        });
    }

    addDepartment(departmentName = this.name) {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        const params = [departmentName];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateDepartment() {
        const sql = `UPDATE department SET ? WHERE ?`;
        const params = [this.name, this.id];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

    deleteDepartment() {
        const sql = `DELETE FROM department WHERE ?`;
        const params = [this.id];

        this.db.query(sql, params, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = Department;