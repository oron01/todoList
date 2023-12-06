alert("a")

let createTodoFunctionality = () => {
    let projects = []
    let createProject = (projectName,projectDescription,taskList) => {
        let name = projectName
        let description = projectDescription
        let projectTasks = taskList
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

    let assignTask = (taskToAssign, toProjectNamed) => {}

    function alertA(content) {
        console.log(content)
    }

    let testTask = createTask("test")
    alertA(testTask)
}