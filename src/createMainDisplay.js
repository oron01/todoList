export let createMainDisplay = (controllerObject) => {
    let container = document.querySelector(".container")
    let mainContainer = document.createElement("div")
    mainContainer.classList = "mainContainer"
    container.appendChild(mainContainer)
    let getProjectName = () => {
        if (controllerObject.selectedProject !== null) 
        {console.log(controllerObject.selectedProject.projectName)
            return controllerObject.selectedProject.projectName}
    }

    let updateMain = () => {
        mainContainer.innerHTML = ""
        alert("shobama")
        createProjectDisplay()}

    let createProjectDisplay = () => {
        let div = document.createElement("div")
        div.classList = "projectDisplay"
        let header = document.createElement("h1")
        header.textContent = getProjectName()
        header.classList = "projectDisplayTitle"
        mainContainer.appendChild(div)
        div.appendChild(header)

        let getProjectDescription = () => {
            if (controllerObject.selectedProject !== null) return controllerObject.selectedProject.projectDescription
        }
        let createProjectDescription = (projectDescriptionText) => {
            let projectDescriptionHeader = document.createElement("h1")
            projectDescriptionHeader.textContent = "Description:"
            projectDescriptionHeader.classList = "projectHeader projectDescriptionHeader"
            let projectDescription = document.createElement("p")
            div.appendChild(projectDescriptionHeader)
            div.appendChild(projectDescription)
            projectDescription.textContent = projectDescriptionText
            div.appendChild(projectDescription)
            projectDescription.classList = "projectDescriptionText"
        }
        createProjectDescription(getProjectDescription())
        
        let createProjectTasklist = () => {
            let tasklistDiv = document.createElement("div")
            let tasklistHeader = document.createElement("h1")
            tasklistHeader.textContent = "Tasks:"
            div.appendChild(tasklistHeader)
            tasklistHeader.classList = "projectHeader projectTasklistHeader"
            div.appendChild(tasklistDiv)
            let createProjectTask = (taskObject) => {
                let taskDiv = document.createElement("div")
                taskDiv.classList = "taskDiv"
                let nameValue = taskObject.taskName
                let dueDateValue = taskObject.dueDate
                let checkStatusValue = taskObject.CheckStatus
                let priority = taskObject.priority 
                let checkbox = document.createElement("div")

                let setPriorityValue = () => {

                }
                
                let setCheckerValue = () => {
                if (checkStatusValue == true) {checkbox.classList = "checkbox markedCheckbox"}
                else if (checkStatusValue == false) {checkbox.classList = "checkbox"}}
                
                setCheckerValue()

                let name = document.createElement("p")
                name.textContent = nameValue
                let dueDate = document.createElement("p")
                dueDate.textContent = dueDateValue
                tasklistDiv.appendChild(taskDiv)
                taskDiv.appendChild(name)
                taskDiv.appendChild(dueDate)
                taskDiv.appendChild(checkbox)

                let toggleCheckerFunction = () => {
                    if (checkStatusValue == true) {checkStatusValue = false}
                    else {checkStatusValue = true}
                    setCheckerValue()
                }
                checkbox.addEventListener("click",toggleCheckerFunction)
            }
            let fakeObj = {
                taskName : "ExampleName",
                dueDate: "12/04/20",
                CheckStatus: true,
                priorty: "low"
            }

            let renderProjectTasks = () => {
                if (controllerObject.selectedProject == null || controllerObject.selectedProject.tasks == null) return
                let TasklistObject = controllerObject.selectedProject.tasks
                for (let i = 0 ; i < TasklistObject.length; i++) {
                    createProjectTask(TasklistObject[i])
            }
            }
            renderProjectTasks()

            let newTaskPrompt = () => {
                let body = document.querySelector("body")

                let promptDialog = document.createElement("dialog")
                promptDialog.classList = "promptDialog"
                body.appendChild(promptDialog)
                promptDialog.showModal()

                let promptContainer = document.createElement("div")
                promptContainer.classList = "promptContainer"
                promptDialog.appendChild(promptContainer)
                
                let closeButton = document.createElement("div")
                closeButton.classList = "promptCloseButton"
                promptContainer.appendChild(closeButton)

                let closePrompt = () => {promptDialog.close()
                body.removeChild(promptDialog)}
                closeButton.addEventListener("click",closePrompt)
                
                let saveButton = document.createElement("div")
                saveButton.classList = "promptSaveButton"
                promptContainer.appendChild(saveButton)

                let savePrompt = () => {
                    console.table(createNameInput)
                    let newTask = {
                        taskName : createNameInput.input.value,
                        dueDate: createDueDateInput.input.value,
                        CheckStatus: false,
                        taskDescription: createDescriptionInput.input.value,
                        taskNotes: createNotesInput.input.value,
                        priorty: "low"
                    }
                    promptDialog.close()
                    body.removeChild(promptDialog)
                    controllerObject.selectedProject.tasks.push(newTask)
                    updateMain()
                }
                saveButton.addEventListener("click",savePrompt)

                let promptForm = document.createElement("form")
                promptContainer.appendChild(promptForm)
                promptForm.classList = "promptForm"

                let promptInputDiv = document.createElement("div")
                promptInputDiv.classList = "promptInputDiv"
                promptForm.appendChild(promptInputDiv)

                let promptFormHeader = document.createElement("h1")
                promptFormHeader.textContent = "Create new task"
                promptInputDiv.appendChild(promptFormHeader)

                let createInput = (name,element,text) => {
                    let inputDiv = document.createElement("div")
                    inputDiv.classList = `inputDiv ${name}InputDiv`
                    promptInputDiv.appendChild(inputDiv) 
                    let inputHeader = document.createElement("h1")
                    inputHeader.textContent = text
                    inputDiv.appendChild(inputHeader) 
                    let input = document.createElement(element)
                    inputDiv.appendChild(input)
                    input.classList = `promptInput ${name}Input` 
                    return {inputDiv,inputHeader,input}   
                }

                let createNameInput = createInput("name","input","Task Name")
                createNameInput.input.type = "text"

                let createDueDateInput = createInput("dueDate","input","Due Date:")
                createDueDateInput.input.type = "date"

                let createDescriptionInput = createInput("description","textArea","Task Description")

                let createPriorityInput = createInput("priority","div","Task Priority:")
                createPriorityInput.priority = "low"
                createPriorityInput.input.classList = "priorityInput"

                let createPriorityLevel = (name,backgroundColor) => {
                    let level = document.createElement("div")
                    createPriorityInput.input.appendChild(level)
                    level.classList = `${name} priorityLevel`
                    level.textContent = name
                    level.style.backgroundColor = backgroundColor
                    let priorityDisplayRefersher = () => {
                        let priorities = document.querySelectorAll(".activePriority")
                        priorities.forEach(priority => {priority.classList.remove("activePriority")})
                    }
                    let prioritySetter = (e) => {
                        priorityDisplayRefersher()
                        e.currentTarget.classList.add("activePriority")
                        createPriorityInput.priority = e.currentTarget.textContent
                    }
                    level.addEventListener("click",prioritySetter)
                    return level
                }
                createPriorityLevel("low","green")
                createPriorityLevel("med","yellow")
                createPriorityLevel("high","red")
                
                let createNotesInput = createInput("notes","textarea","Task Notes")
            }

            let createNewTaskButton = () => {
                let button = document.createElement("div")
                tasklistDiv.appendChild(button)
                button.textContent = "+ Add new task"
                button.classList = "newTaskButton"
                button.addEventListener("click",newTaskPrompt)
            }
            createNewTaskButton()
        }
        createProjectTasklist()
        }
        createProjectDisplay()
        return {updateMain}
}