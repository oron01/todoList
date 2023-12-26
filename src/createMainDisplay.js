export let createMainDisplay = (controllerObject) => {
    let container = document.querySelector(".container")
    let mainContainer = document.createElement("div")
    mainContainer.classList = "mainContainer"
    container.appendChild(mainContainer)
    let getProjectName = () => {
        if (controllerObject.selectedProject !== null) 
        {console.log(controllerObject.selectedProject[0])
            console.log(controllerObject.selectedProject.projectName)
            return controllerObject.selectedProject.projectName}
    }

    let updateMain = () => {
        mainContainer.innerHTML = ""
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

                    let getTaskByName = (taskName) => {
                    let project = controllerObject.selectedProject.tasks.filter((task) => {
                        return (task.taskName == taskName)})
                        if (project.length !== 0) return project[0]
                        else return null
            }

        let getTaskReference = (e) => {
            let parent = e.target.parentElement.parentElement
            let taskName = parent.querySelector(".taskName").textContent
            let taskReference = getTaskByName(taskName)
            return taskReference

        }
        
        let unformatDueDate = (dueDate) => {
            let preformattedDueDate = dueDate.split("-").join("/")
            let formattedDueDate = preformattedDueDate.split("/").reverse().join("/");
            return formattedDueDate
        }

        let renderEditTask = (e) => {
            let body = document.querySelector("body")

            let taskReference = getTaskReference(e)
            console.log(taskReference)

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
                        dueDate: unformatDueDate(createDueDateInput.input.value),
                        CheckStatus: false,
                        taskDescription: createDescriptionInput.input.value,
                        taskNotes: createNotesInput.input.value,
                        priority: createPriorityInput.priority
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
            promptFormHeader.textContent = "Edit task"
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
            createNameInput.input.value = taskReference.taskName

            let createDueDateInput = createInput("dueDate","input","Due Date:")
            createDueDateInput.input.type = "date"
            alert(taskReference.dueDate[2])
            let formattedDueDate = () => {
            let formattedDueDate = taskReference.dueDate
                if (taskReference.dueDate[2] == "/") {
                alert("true")
                alert(taskReference.dueDate[4])
            let preformattedDueDate = taskReference.dueDate.split("/").join("-")
            let formattedDueDate = preformattedDueDate.split("-").reverse().join("-");
            return formattedDueDate} return formattedDueDate}

            createDueDateInput.input.value = formattedDueDate()

            let createDescriptionInput = createInput("description","textArea","Task Description")
            createDescriptionInput.input.value = taskReference.taskDescription

            let createPriorityInput = createInput("priority","div","Task Priority:")
            createPriorityInput.priority = taskReference.priority
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

        let renderViewTask = (e) => {
            let body = document.querySelector("body")

            let taskReference = getTaskReference(e)

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

            let promptForm = document.createElement("form")
            promptContainer.appendChild(promptForm)
            promptForm.classList = "promptForm"

            let promptDisplayDiv = document.createElement("div")
            promptDisplayDiv.classList = "promptDisplayDiv"
            promptForm.appendChild(promptDisplayDiv)

            let promptFormHeader = document.createElement("h1")
            promptFormHeader.textContent = "View task"
            promptDisplayDiv.appendChild(promptFormHeader)

            let createDisplay = (name,element,text,value) => {
                let displayDiv = document.createElement("div")
                displayDiv.classList = `displayDiv ${name}DisplayDiv`
                promptDisplayDiv.appendChild(displayDiv)
                let displayHeader = document.createElement("h1")
                displayHeader.textContent = text
                displayDiv.appendChild(displayHeader)
                let display = document.createElement(element)
                display.textContent = value
                displayDiv.appendChild(display)
                display.classList = `promptDisplay ${name}Display`
                return {displayDiv,displayHeader,display}
            }

            let createNameDisplay = createDisplay("name","p","Task Name:",taskReference.taskName)
            createNameDisplay.display.value = taskReference.taskName

            let createDueDateDisplay = createDisplay("dueDate","p","Due Date:")
            alert(taskReference.dueDate[2])
            let formattedDueDate = () => {
            let formattedDueDate = taskReference.dueDate
                if (taskReference.dueDate[2] == "/") {
                alert("true")
                alert(taskReference.dueDate[4])
            let preformattedDueDate = taskReference.dueDate.split("/").join("-")
            let formattedDueDate = preformattedDueDate.split("-").reverse().join("-");
            return formattedDueDate} return formattedDueDate}

            createDueDateDisplay.display.textContent = formattedDueDate()

            let createDescriptionDisplay = createDisplay("description","p","Task Description")
            createDescriptionDisplay.display.textContent = taskReference.taskDescription

            let createPriorityDisplay = createDisplay("priority","p","Task Priority:")
            createPriorityDisplay.display = taskReference.priority
            
            let createNotesDisplay = createDisplay("notes","p","Task Notes")
        }
        
        let createProjectTasklist = () => {
            let tasklistDiv = document.createElement("div")
            let tasklistHeader = document.createElement("h1")
            tasklistHeader.textContent = "Tasks:"
            div.appendChild(tasklistHeader)
            tasklistHeader.classList = "projectHeader projectTasklistHeader"
            div.appendChild(tasklistDiv)
            let createProjectTask = (taskObject) => {
                let taskDiv = document.createElement("div")
                taskObject.taskDiv = taskDiv
                taskDiv.classList = "taskDiv"
                let nameValue = taskObject.taskName
                let dueDateValue = taskObject.dueDate
                let checkStatusValue = taskObject.CheckStatus
                let priority = taskObject.priority 
                let checkbox = document.createElement("div")
                let createButton = (buttonName,buttonFunction,imgSrc) => {
                    let buttonImg = document.createElement("img")
                    buttonImg.classList = `buttonImg ${buttonName}`
                    buttonImg.src = imgSrc
                    buttonImg.height = 25
                    buttonImg.width = 15
                    buttonImg.addEventListener("click",buttonFunction)
                    return {buttonImg}
                }

                let editButtonFunction = (e) => {
                    renderEditTask(e)
                    alert("editButton clicked")
                }
                let viewButtonFunction = (e) => {
                    alert("viewButtonClicked")
                    renderViewTask(e)
                }
                let deleteButtonFunction = (e) => {
                    let taskReference = getTaskReference(e)
                    controllerObject.selectedProject.tasks.splice(controllerObject.selectedProject.tasks.indexOf(taskReference),1)
                    controllerObject.updateMain()
                }
                let editButtonSRC = "https://img.icons8.com/windows/32/FFFFFF/pen-squared.png"
                let editButton = createButton("editButton",editButtonFunction,editButtonSRC)
                editButton.buttonImg.addEventListener("click",editButtonFunction)
                let viewButtonSRC = "https://img.icons8.com/material-outlined/24/FFFFFF/info-squared.png"
                let viewButton = createButton("viewButton",viewButtonFunction,viewButtonSRC)
                let deleteButtonSRC = "https://img.icons8.com/material-sharp/24/FFFFFF/waste.png"
                let deleteButton = createButton("deleteTaskButton",deleteButtonFunction,deleteButtonSRC)
                console.log(controllerObject.projects)

                let getPriorityValue = () => {

                }

                let setPriorityValue = () => {
                    switch (priority) {
                        case "low":
                            taskDiv.classList.add("low")
                            break;
                        case "med":
                            taskDiv.classList.add("med")
                            break;
                        case "high":
                            taskDiv.classList.add("high")
                            break;
                    }
                }
                setPriorityValue()
                
                let setCheckerValue = () => {
                if (checkStatusValue == true) {checkbox.classList = "checkbox markedCheckbox"}
                else if (checkStatusValue == false) {checkbox.classList = "checkbox"}}
                
                setCheckerValue()

                let name = document.createElement("p")
                name.textContent = nameValue
                name.classList = "taskName"
                let dueDate = document.createElement("p")
                dueDate.textContent = dueDateValue
                let dateAndButtonsDiv = document.createElement("div")
                dateAndButtonsDiv.classList = "dateAndButtonsDiv"
                tasklistDiv.appendChild(taskDiv)
                taskDiv.appendChild(checkbox)
                taskDiv.appendChild(name)
                taskDiv.appendChild(dateAndButtonsDiv)
                dateAndButtonsDiv.appendChild(dueDate)
                dateAndButtonsDiv.appendChild(editButton.buttonImg)
                dateAndButtonsDiv.appendChild(deleteButton.buttonImg)
                dateAndButtonsDiv.appendChild(viewButton.buttonImg)

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
                        priority: createPriorityInput.priority
                    }
                    console.log(newTask)
                    if (newTask.dueDate == "") newTask.dueDate = "No date" 
                    let isNameDuped = () => {
                        if (getTaskByName(createNameInput.input.value) !== null)
                        return true
                     else return false
                    }
                    let isNameEmpty = () => {
                        if (createNameInput.input.value == "")
                        return true
                     else return false
                    }
                    promptDialog.close()
                    body.removeChild(promptDialog)
                    if (isNameDuped() == false && isNameEmpty() == false) 
                        {controllerObject.selectedProject.tasks.push(newTask)}
                    else if (isNameDuped() == true) {alert("Tasks can't have the same name")}
                    else {alert("Task names can't be blank.")}
                    updateMain()
                    controllerObject.updateSecondary()
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