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
                dueDate: "11/11/2022",
                CheckStatus: false,
                priority: "low",
                taskDescription:"You know nall that"
            }]
    }
    let projects = [generalTasks]
    let selectedProject = generalTasks
    let updateMain = () => {mainDisplay.updateMain()
        localStorage["controllerObjectProjects"] = JSON.stringify(controllerObject.projects)
        alert("updarted")  
        console.log(localStorage["controllerObjectProjects"])  
    }
    let updateSecondary = () => {secondaryDisplay.refreshTestPanel()
        localStorage["controllerObjectProjects"] = JSON.stringify(controllerObject.projects)}
    return {projects,selectedProject,updateMain,updateSecondary}
}

const handleLocalStorageUpdate = () => {
    console.log("Data retrieved from localStorage:", controllerObject.projects);
}

let controllerObject = createControllerObject()
if (localStorage.controllerObjectProjects !== undefined && localStorage.controllerObjectProjects !== null) {alert("asd")
    controllerObject.projects = JSON.parse(localStorage.getItem("controllerObjectProjects"))
handleLocalStorageUpdate()
}


let createSecondaryDisplay = () => {
    let container = document.querySelector(".container")
    let secondaryContainer = document.createElement("div")
    secondaryContainer.classList = "secondaryContainer"
    container.appendChild(secondaryContainer)

    let refreshTestPanel = () => {
        // let selectedProject = document.querySelector(".testSelectedProject")
        // secondaryContainer.removeChild(selectedProject)
        // communicateTestPanel()
        let statsThing = document.querySelector(".sSidebarDiv")
        secondaryContainer.removeChild(statsThing)
        renderSidebar()
    }
    let renderTestPanel = () => {
        let selectedProject = document.createElement("div")
        secondaryContainer.appendChild(selectedProject)
        if (controllerObject.selectedProject !== null) {selectedProject.textContent = controllerObject.selectedProject.projectName}
        else {selectedProject.textContent = "empty"}
        selectedProject.classList = "testSelectedProject"
    }
    // renderTestPanel()

    let renderSidebar = () => {
        let sidebarDiv = document.createElement("div")
        sidebarDiv.classList = "sSidebarDiv"
        let sidebarHeader = document.createElement("h1")
        sidebarHeader.textContent = "Stats"
        sidebarHeader.classList = "sSidebarHeader"
        secondaryContainer.appendChild(sidebarDiv)
        sidebarDiv.appendChild(sidebarHeader)

        let projectsCounterDiv = document.createElement("div")
        projectsCounterDiv.classList = "projectsCounterDiv"
        sidebarDiv.appendChild(projectsCounterDiv)
        let projectCounterLabel = document.createElement("p")
        projectCounterLabel.textContent = `Total Projects: ${controllerObject.projects.length}`
        projectCounterLabel.classList = "projectCounterLabel"
        projectsCounterDiv.appendChild(projectCounterLabel)
        let taskCounterLabel = document.createElement("p")

        let getTasksCount = () => {
            let taskCount = 0
            for (let i = 0; i < controllerObject.projects.length ; i++) {
                taskCount = i + controllerObject.projects[i].tasks.length
                console.log(controllerObject.projects[i].tasks.length)
            }
            return taskCount
        }
        taskCounterLabel.textContent = `Total Tasks: ${getTasksCount()}`
        projectsCounterDiv.appendChild(taskCounterLabel)

        let taskDueToday = document.createElement("p")
        
        let getTasksDueToday = () => {
            let tasksDue = 0
            let tasksCompleted = 0
            for (let i = 0; i < controllerObject.projects.length ; i++) {
                for (let i2 = 0 ; i2 < controllerObject.projects[i].tasks.length; i2++) {
                    if (controllerObject.projects[i].tasks[i2].CheckStatus == true) {tasksCompleted = tasksCompleted + 1
                    tasksDue = tasksDue + 1}
                    else if (controllerObject.projects[i].tasks[i2].CheckStatus == false) {tasksDue = tasksDue + 1}
                }
            }
            return {tasksDue,tasksCompleted}
        }
        taskDueToday.textContent = `Tasks assigned to today (Completion status): ${getTasksDueToday().tasksCompleted}/${getTasksDueToday().tasksDue}`
        projectsCounterDiv.appendChild(taskDueToday)
    }
    renderSidebar()

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

controllerObject.updateMain()

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