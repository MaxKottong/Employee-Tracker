DROP DATABASE IF EXISTS eTrackerDB;
CREATE DATABASE eTrackerDB;

USE eTrackerDB;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE employee (
	id INT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INT,
	manager_id INT,
	PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

ALTER TABLE employee
ADD CONSTRAINT role_id
    FOREIGN KEY (role_id)
        REFERENCES role (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
ADD CONSTRAINT manager_id    
    FOREIGN KEY (manager_id)
        REFERENCES employee (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

ALTER TABLE role
ADD CONSTRAINT department_id
    FOREIGN KEY (department_id)
        REFERENCES department (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

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