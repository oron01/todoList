import css from "./style.css"
import { createSidebarDisplay } from "./createSidebarDisplay"
import { createTodoFunctionality } from "./createTodoListFunctionality"
import { createContainer } from "./createContainer"
import { createMainDisplay } from "./createMainDisplay"

let createControllerObject = () => {
    let generalTasks = {
        projectName: "General Tasks",
        projectDescription: "A to do list for your tasks",
        isSelectedProject: true,
        sidebarReference: null,
        tasks: [
            {
                taskName : "Figure out how to use this app",
                dueDate: "17/12/2023",
                CheckStatus: false,
                priorty: "low",
            }]
    }
    let projects = [generalTasks]
    let selectedProject = generalTasks
    let updateMain = () => {mainDisplay.updateMain()}
    let updateSecondary = () => {secondaryDisplay.refreshTestPanel()}
    return {projects,selectedProject,updateMain,updateSecondary}
}

let controllerObject = createControllerObject()

let createSecondaryDisplay = () => {
    let container = document.querySelector(".container")
    let secondaryContainer = document.createElement("div")
    secondaryContainer.classList = "secondaryContainer"
    container.appendChild(secondaryContainer)

    let refreshTestPanel = () => {
        if (controllerObject.selectedProject !== null) {
        let selectedProject = document.querySelector(".testSelectedProject")
        secondaryContainer.removeChild(selectedProject)}
        renderTestPanel()
    }
    let renderTestPanel = () => {
        let selectedProject = document.createElement("div")
        if (controllerObject.selectedProject !== null) {selectedProject.textContent = controllerObject.selectedProject.projectName}
        secondaryContainer.appendChild(selectedProject)
        selectedProject.classList = "testSelectedProject"
    }
    renderTestPanel()
    return {refreshTestPanel,renderTestPanel}
}

let todoApp =  createTodoFunctionality()
todoApp.createProject("project1","First-Project")
todoApp.createProject("project3","Second-Project")
let a = todoApp.createTask("firstTask",)
let b = todoApp.createTask("secondTask",)
todoApp.assignTask(a,"project1",1)
todoApp.assignTask(b,"project3",1)
// todoApp.moveTask.call(todoApp,"project1",a,"project3")
todoApp.alertProjects()
console.log(Array.isArray(todoApp.projects[0].projectTasks))

let container = createContainer.call(this,controllerObject)
let sidebar = createSidebarDisplay.call(this,controllerObject)
let mainDisplay = createMainDisplay.call(this,controllerObject)
let secondaryDisplay = createSecondaryDisplay.call(this,controllerObject)
/* 
Code
Functionality:
1) Create Projects V
2) Create tasks V
3) Change Properties ~ 
A) of tasks X
B) of Projects V 
4) Change location of tasks
5) Copy tasks
6) Delete Tasks
7) View tasks by common thing like date ?

UI Functionality:
1) Hamburger menu?
2) Popup for new project?




*/