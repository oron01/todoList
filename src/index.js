
let createTodoFunctionality = () => {
    let projects = []
    let createProject = (projectName,projectDescription,taskList) => {
        let name = projectName
        let description = projectDescription
        let projectTasks = []
        projectTasks.push(taskList)
        projects.push({name,description,projectTasks})
        return {name,description,projectTasks}
    }

    let createTask = (taskName,taskDescription,taskDueDate,taskPriority,taskNotes) => {
        let name = taskName
        let description = taskDescription
        let dueDate = taskDueDate
        let priority = taskPriority
        let notes = taskNotes
        return {name,description,dueDate,priority,notes}
    }

    let assignTask = (taskToAssign, toProjectNamed) => {
        let project = findProjectByName(toProjectNamed)
        project.projectTasks.push(taskToAssign)
    }

    let moveTask = (prevProjectName,taskToMove, toProjectNamed,count) => {
        let prevProject = findProjectByName(prevProject)
        prevLocation.splice(taskToMove.priority,1)
        let project = findProjectByName(toProjectNamed)
        project.projectTasks.splice(taskToMove.priority,0,taskToMove)
        // count yet to be implemented
    }

    let findProjectByName = (projectName) => {
        for (let i = 0; i < projects.length; i ++) {
            if (projects[i].name == projectName) {
                console.log(projects[i])
                return projects[i]
            }
        }
    }

    let alertProjects = () => {
        console.log(projects)
    }
    let changeProperty = (instanceType,instanceName,propertyName,newValue) => {
        let changeTask = () => {   
        }
        let changeProject = () => {
            let project = findProjectByName(instanceName)
            project[propertyName] = newValue
        }
        switch (instanceType) {
            case "project":
                changeProject()
                break;
            case "task":
                changeTask()
            break;
        }
        console.log(projects)

    }
    return {projects,createProject,createTask,assignTask,alertProjects,findProjectByName, changeProperty, moveTask}
}
let todoApp =  createTodoFunctionality()
todoApp.createProject("project1","First-Project")
// let taskTest = todoApp.createTask("obamsky")
todoApp.alertProjects()
alert("a")
// todoApp.assignTask(taskTest,"project1")
todoApp.changeProperty("project","project1","projectTasks",["banana"])
