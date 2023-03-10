const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = []

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
    inquirer.prompt([
        {
        type : 'list',
        name : 'position',
        message : 'What position is this employee?',
        choices : [
            'Manager',
            'Intern',
            'Engineer',
            ]
        },
        {
            type: 'input',
            name : 'name',
            message: 'What is the name of the employee?',
        },
        {
            type: 'input',
            name : 'email',
            message: 'What is the email of the employee?',
        },
        {
            type: 'input',
            name : 'id',
            message: 'What is the id of the employee?',
        }

             ]).then(({ position, email, id, name }) => {
            switch (position) {
                case 'Manager':
                
                inquirer.prompt([
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is the office number?',
                }
            ]).then(({ officeNumber }) => {
                employees.push(new Manager(
                    name,
                    id,
                    email,
                    officeNumber
                ))
                anotherEmployee()
            })
            break;
                case 'Intern':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'school',
                            message: 'What school are they going to?',
                        }
                    ]).then(({ school }) => {
                        employees.push(new Intern(
                            name,
                            id,
                            email,
                            school
                        ))
                        anotherEmployee()
                    })
                    break;
                case 'Engineer':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'github',
                            message: 'What is their github profile?',
                        }
                    ]).then(({ github }) => {
                        employees.push(new Engineer(
                            name,
                            id,
                            email,
                            github
                        ))
                        anotherEmployee()
                    })
                    break;
                default:

            }
            
        })
    
    }

    function anotherEmployee(){
    
        return inquirer.prompt([
    
            {
    
                type : 'confirm',
    
                name : 'moreEmployees',
    
                message : "Would you like to add another Employee?"
    
            }
    
        ]).then(({ moreEmployees }) => {
    
            if (moreEmployees) newEmployee()
    
            else renderHTMLFile();
    
        })
    
    }
    
    function renderHTMLFile() {
      
        fs.writeFileSync('./index.html', /*html*/`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Team Profile Generator</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        </head>
        <div class="jumbotron" style="text-align: center; border-bottom: 5px solid black; opacity : .9; background : linear-gradient(to top, rgb(185, 166, 160), rgb(39, 181, 228)); color:black; text-align:center; " id="jumbotron">
        <h1 class="display-4" style="font-weight:bolder;">This is our team!</h1>
        </div>
        <div class="container">
        <div class="row">

        ${employees.map(employees => `
        <div class = "col-md-3 text-dark" style = "margin : 5px; padding : 0; text-align : center; background-color: rgb(216, 214, 214); border-radius: 5px; border-color: black; border-style: solid; box-shadow: 5px 5px 5px rgb(81, 79, 79);">
        <header style="background : rgb(39, 181, 228)">
            <h1>${employees.getName()}</h1>
            ${uniqueIcon(employees)}
            </header>
            <p class = 'fa-solid fa-id-card'> ID NUMBER : ${employees.getId()}</p><br>
            <p class= "fa-solid fa-envelope"><a href="mailto:${employees.getEmail()}"> Email</a></p><br>
            ${uniqueInfo(employees)}
            </div>

            `)}
            </div>
            </div>
        `)
        }
        
        function uniqueInfo (employees) {
            switch (employees.getRole())  {
                
                case "Manager": 
                return  `<p class= "fa-solid fa-door-open"> Office Number: ${employees.getOfficeNumber()}</p>` 
                break;
                
                case 'Engineer' : 
                return ` <p class="fa-brands fa-github"><a href ="https://www.github.com/${employees.getGithub()}"> GitHub</a></p>`
                break;
                
                case 'Intern' : 
                return `<p class="fa-solid fa-school-flag"> School : ${employees.getSchool()}</p>`
                break;
            }
        }
        
        function uniqueIcon(employees){
            switch(employees.getRole()) {
            case "Manager" : 
            return `<h3 class= "fa-solid fa-business-time"> ${employees.getRole()}</h3><br>`
            break;
            case 'Engineer' :
                return `<h3 class= "fa-solid fa-laptop-code"> ${employees.getRole()}</h3><br>`
            break;
            case "Intern" :
                return `<h3 class= "fa-solid fa-user"> ${employees.getRole()}</h3><br>`
        }
        }
   
    
   
    newEmployee()