//dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '6C6iuV82HIl9',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

db.connect(function(err) {
    if (err) throw err
    console.log("MySql Connected")
displayTracker()});

const displayTracker = ()=>{
    return inquirer
    .prompt ([{
    type: "list",
    name: "main_menu",
    message: "Hello! What would you like to do?",
    choices: ["View all Departments", "View all Roles", "View all Employees", "Add Department", "Add Role", "Add Employee", "Update Employee", "Exit"]
    }])
    .then(answers => {
      const selectChoice = answers.main_menu;
      if(selectChoice === "View all Departments"){
        viewAllDepartments();
      }
      if(selectChoice === "View all Roles"){
        viewAllRoles();
      }
      if(selectChoice === "View all Employees"){
        viewAllEmployees();
      }
      if(selectChoice === "Add Department"){
        addDepartment();
      }
      if(selectChoice === "Add Role"){
        addRole();
      }
      if(selectChoice === "Add Employee"){
        addEmployee();
      }
      if(selectChoice === "Update Employee"){
        updateEmployee();
      }
    })
};

const viewAllDepartments = () => {
  console.log("Viewing Departments")
  db.query('SELECT * FROM departments', function (err, results){
    console.table(results)
    return inquirer
    .prompt ([{
      type: "list",
      name: 'department_list',
      choices: ["Back", "Add Department"]
    }])
    .then(answers =>{
      const deptChoice = answers.department_list;
      if(deptChoice === "Back"){
        displayTracker();
      }
      if(deptChoice === "Add Department"){
        addDepartment();
      }
    })
  })
};

const addDepartment = () => {
  return inquirer
  .prompt ([{
    type: 'input',
    name: 'deptName',
    message: 'Enter Department Name',
  },
  {
  type: 'input',
  name: 'deptId',
  message: "Enter Department ID",
  }])
  .then(answers =>{
    const newDeptName = answers.deptName;
    const newDeptId = answers.deptId;
    db.query(`INSERT into departments (id, department_name) VALUES (?, ?)`, [newDeptId, newDeptName], (err, results) => {
      if (err){
        throw err
      }
      console.table(results)
      return viewAllDepartments();
    })
  })
};

viewAllRoles = () =>{
  db.query(`select roles.id, 
  roles.title, 
  roles.salary, 
  departments.department_name as department 
  from roles 
  left join departments on roles.department_id = departments.id`
  , function (err, results){
    if (err){
      throw err
    }
    console.table(results)
    return inquirer
    .prompt([{
      type: "list",
      name: 'roleList',
      choices: ["Back", "Add Role"]
    }])
    .then(answers =>{ 
      const roleChoice = answers.roleList;
      if(roleChoice === "Back"){
        displayTracker();
      }
      if(roleChoice === "Add Role"){
        addRole();
      }
  })
})};

addRole = ()=>{
  //query to get dept list and insert into array for choices

 return inquirer 
.prompt ([{
  type: 'input',
  name: 'roleName',
  message: 'Enter Role Name',
},
{
type: 'input',
name: 'roleId',
message: "Enter Role ID",
},

{
type: 'input',
name: 'salary',
message: "Enter Salary",
},

{
  type: 'input',
  name: 'deptId',
  message: "Enter Department ID",  
},

])
.then(answers =>{
  const name = answers.roleName;
  const id = answers.roleId;
  const salary = answers.salary;
  const deptId = answers.deptId;
  db.query(`INSERT into roles (id, title, salary, department_id) VALUES (?,?,?,? )`, [id, name, salary, deptId], (err, results) => {
    if (err){
      throw err
    }
    console.table(results)
    return viewAllRoles();
})
})};

viewAllEmployees = () =>{
  db.query(`SELECT employees.id, 
    employees.first_name, 
    employees.last_name,
    roles.title AS title,
    roles.salary AS salary,
    departments.department_name AS department,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager 
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees manager ON employees.manager_id = manager.id`
, function (err, results){
  if (err){
    throw err
  }
  console.table(results)
  return inquirer
  .prompt([{
    type: "list",
    name: 'employeeList',
    choices: ["Back", "Add Employee"]
  }])
  .then(answers =>{ 
    const roleChoice = answers.employeeList;
    if(roleChoice === "Back"){
      displayTracker();
    }
    if(roleChoice === "Add Employee"){
      addEmployee();
    }
})})};

addEmployee = () => {
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter Employee First Name',
    },
    {
    type: 'input',
    name: 'lastName',
    message: "Enter Employee Last Name",
    },
    
    {
    type: 'input',
    name: 'id',
    message: "Enter Employee ID",
    },

    {
      type: 'input',
      name: 'role_id',
      message: "Enter Employee Role ID",
      },
    
    {
      type: 'input',
      name: 'manager_id',
      message: "Enter Manager ID (If Manager enter 0)",  
    },
])
.then(answers => {
const first_name = answers.firstName;
const last_name = answers.lastName;
const id = answers.id;
const role_id = answers.role_id;
const manager_id = answers.manager_id;
db.query(`INSERT into employees (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)`, [id, first_name, last_name, role_id, manager_id], (err, results) => {
if(err){
  throw err
}
console.table(results)
return viewAllEmployees();
})
})
};

updateEmployee = () =>{
   db.query(`SELECT employees.id, employees.first_name, employees.last_name FROM employees`, (err, results) => {
    if(err){
      throw err
    }
    console.table(results)
    getEmployeeID();
  })
};

const getEmployeeID =  () => {

  return inquirer
  .prompt([
  {
    type: "input",
    name: 'employeeId',
    message: 'What is the Employee ID?'
  }
])
.then(answers =>{
  const selectedId = answers.employeeId;
  console.log(selectedId)

  db.query(`SELECT roles.id, roles.title FROM roles`, (err, results) => {
    if(err){
      throw err
    }
    console.table(results)});
  

return inquirer
.prompt([
  {
  type: 'input',
  name: 'newRole',
  message: "Enter new role ID for your employee"
}
])
.then(answers =>{
  const selectedRole = answers.newRole
  console.log(selectedRole, selectedId)

 db.query(`UPDATE employees SET role_id = ? WHERE employees.id = ?`,  [selectedRole, selectedId], (err, res) =>{
  if(err){ throw err
  }
  // console.table(res)
  console.log('Employee role updated')
  viewAllEmployees();
 })
}
)




})}
