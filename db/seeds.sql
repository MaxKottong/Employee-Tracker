INSERT INTO department
(name) VALUES 
("IT"),
("Accounting"),
("Finance"),
("Marketing"),
("Business"),
("Operations");

INSERT INTO role
(title, salary, department_id) VALUES 
("CTO", 100000, 1),
("CPA", 80000, 2),
("CFO", 90000, 3),
("CMO", 70000, 4),
("CEO", 120000, 5),
("COO", 110000, 6);

INSERT INTO employee
(first_name, last_name, role_id, manager_id) VALUES
("Max", "Kottong", 5,null),
("Jacob", "Smith", 2,1),
("Alex", "Curt", 3, 1),
("Jackie", "Brown", 2,3),
("Andrea", "Sharp", 1, 1),
("Steven", "Wood", 6, 1);