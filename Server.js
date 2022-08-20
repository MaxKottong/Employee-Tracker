const db = require('./utils/Database');
const PORT = process.env.PORT || 3001;
const inquirer = require('inquirer');
const mysql = require('mysql2');
const Employee = require('./lib/Employee');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

