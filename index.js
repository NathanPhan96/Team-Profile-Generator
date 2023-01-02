
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = []
const position = employees.role;

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
        fs.writeFileSync("./index.html", generateTeam(employees),
        "utf-8"
        )   
    fs.writeFileSync('./index.html', /*html*/`
    
    <ul>
    
    ${employees.map(employees => `
    
        <li>
    
        <div>
    
        <h1>${employees.getName()}</h1>
    
        <p>${employees.getId()}</p>
    
        <a href="mailto:${employees.getEmail()}">${employees.getEmail()}</a>
    
        <p>${employees.getRole()}</p>
    
        <p>${employees.officeNumber? :}</p>
        <a href ="https://www.github.com/${employees.github}">${employees.github}</a>
        <p>${employees.school}</p>
    
        </div>
    
        </li>
    
         `)}
    
         </ul>
    
    `)
    
    }
    
    const generateTeam = team => {
    
        const generateManager = manager => {
            return `
            <ul>
                <li>
                <div>
                <h1>${manager.getName()}</h1>
                <p>${manager.getId()}</p>
                <a href="mailto:${manager.getEmail()}">${employees.getEmail()}</a>
                <p>${manager.getRole()}</p>
                <p>${manager.getOfficeNumber()}</p>
                </div>
                </li>
                 </ul>
             `;
        };
    
        const generateEngineer = engineer => {
            return `
            <ul>
            <li>
            <div>
            <h1>${engineer.getName()}</h1>
            <p>${engineer.getId()}</p>
            <a href="mailto:${engineer.getEmail()}">${employees.getEmail()}</a>
            <p>${engineer.getRole()}</p>
            <p>${engineer.getGithub()}</p>
            </div>
            </li>
             </ul>
             `;
        };
    
        const generateIntern = intern => {
            return `
            <ul>
            <li>
            <div>
            <h1>${intern.getName()}</h1>
            <p>${intern.getId()}</p>
            <a href="mailto:${intern.getEmail()}">${employees.getEmail()}</a>
            <p>${intern.getRole()}</p>
            <p>${intern.getSchool()}</p>
            </div>
            </li>
             </ul>
             `;
        };
    }

    newEmployee()