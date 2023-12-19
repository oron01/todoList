export let createTodoFunctionality = () => {
    let projects = []
    let createProject = (projectName,projectDescription,taskList=[],projectOrder) => {
        let name = projectName
        let description = projectDescription
        let projectTasks = [...taskList]
        let order = projectOrder
        // projectTasks.push(...taskList)
        projects.push({name,description,projectTasks})
        return {name,description,projectTasks,order}
    }

    let createTask = (taskName,taskDescription,taskDueDate,taskPriority,taskNotes) => {
        let name = taskName
        let description = taskDescription
        let dueDate = taskDueDate
        let priority = taskPriority
        let notes = taskNotes
        return {name,description,dueDate,priority,notes}
    }

    let assignTask = (taskToAssign, toProjectNamed,priority="last") => {
        let project = findProjectByName(toProjectNamed)
        console.log(project)
        if (priority !== "null" && Number.isInteger(priority)) {
            project.projectTasks.splice(priority,0,taskToAssign)
        }
        else if (priority == "last") {
        project.projectTasks.push(taskToAssign)}
        else {
            project.projectTasks.push(taskToAssign)}
        setTaskList(project)
    }

    let moveTask = (prevProjectName,taskName,toProjectNamed,count) => {
        let prevProject = findProjectByName(prevProjectName)
        let prevLocation = prevProject.projectTasks
        let prevTaskInstance = prevLocation[findTaskByName(prevProject,taskName)]
        prevLocation.splice(findTaskByName(prevProject,taskName),1)
        let project = findProjectByName(toProjectNamed)
        project.projectTasks.splice(taskName.priority,0,taskName)
        setTaskList(prevProject)
        setTaskList(project)
        // count yet to be implemented
    }

    let setTaskList = (project) => {
        for (let i = 0 ; i < project.projectTasks.length; i++) {
            project.projectTasks[i].priority = i
        }
    }

    let findProjectByName = (projectName) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name == projectName) {
                // console.log(projects[i])
                return projects[i]
            }
        }
    }

    let findTaskByName = (project,taskName) => {
        let projectTasks = project.projectTasks
        for (let i = 0; i < projectTasks.length;i++) {
            if (projectTasks[i] == taskName) {
                return i
            }
        }
    } 

    let alertProjects = () => {
        console.log(projects)
        console.log(JSON.stringify(projects))
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
    return {projects,createProject,createTask,assignTask,alertProjects,findProjectByName, changeProperty, moveTask,findTaskByName}
}