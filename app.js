const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const myTeam = [];

const render = require("./lib/htmlRenderer");
const { endianness } = require("os");


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const createEngineer = () => {
    //ask the questions
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Engineer name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Email of the Engineer?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the github name for the Engineer?"
        }
    ]).then((answers) => {
        //create new employee Engineer Instance
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        //push new Engineer class instance to myTeam
        myTeam.push(newEngineer)
        //ask the next set of questions
        addEmployee();
    });
}
const createIntern = () => {
    //ask the questions
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Intern name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Email of the Intern?"
        },
        {
            type: "input",
            name: "school",
            message: "What school does this Intern attend?"
        }
    ]).then((answers) => {
        //create new employee Intern Instance
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        //push new Intern class instance to myTeam
        myTeam.push(newIntern)
        //ask the next set of questions
        addEmployee();
    });
}

const createManager = () => {
    //ask the questions
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Email of the Manager?"
        },
        {
            type: "input",
            name: "officeNum",
            message: "What is the Office Room Number for the Manager?"
        }
    ]).then((answers) => {
        //create new employee Manager Instance
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNum);
        //push new Manager class instance to myTeam
        myTeam.push(newManager)
        //ask the next set of questions
        addEmployee();
    });
}

const end = () => {
    fs.writeFileSync(outputPath, render(myTeam), "utf-8")
    console.log("Your Team has been created");
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "which type of employee do you want to add?",
            choices: [
                "Engineer",
                "Intern",
                "Manager",
                "No more"
            ]
        }
    ]).then((answer) => {
        switch (answer.choice) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            case "Manager":
                createManager();
                break;
            default:
                end();
                break;
        }
    });
}

createManager();