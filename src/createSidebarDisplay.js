export let createSidebarDisplay = (controllerObject) => {
    let container = document.querySelector(".container")
    let createSidebar = () => {
        let sidebar = document.createElement("div")
        sidebar.classList = "sidebar"
        container.appendChild(sidebar)
        
        let createFiltersPanel = () => {
            let filtersPanel = document.createElement("div")
            filtersPanel.classList = "filtersPanel panel" 
            sidebar.appendChild(filtersPanel)
            let header = document.createElement("h1")
            header.textContent = "Filters"
            header.classList = "filterHeader sidebarHeader"
            filtersPanel.appendChild(header) 
            let createFilter = (filterName,filterFunctionality,filterImage) => {
                let filterDiv = document.createElement("div")
                filterDiv.classList = "filterDiv"
                let filterImg = document.createElement("img")
                filterImg.height = "25"
                filterImg.width = "25"
                filterImg.classList = "filterImg"
                filterImg.src = filterImage
                let filterTitle = document.createElement("p")
                filterTitle.textContent = filterName
                filterTitle.classList = "filterTitle"
                filtersPanel.appendChild(filterDiv)
                filterDiv.appendChild(filterImg)
                filterDiv.appendChild(filterTitle)
            }
            createFilter("All","","https://img.icons8.com/ios/100/FFFFFF/task-completed.png")
            createFilter("Today","","https://img.icons8.com/ios/50/FFFFFF/tear-off-calendar--v1.png")
            createFilter("Next 7 Days","","https://img.icons8.com/wired/64/FFFFFF/timeline-week.png")
            createFilter("Calendar View","","https://img.icons8.com/ios/50/FFFFFF/calendar--v1.png")
        }

        let createProjectsPanel = () => {
            
            let renderHeader = () => {
            let projectsPanel = document.createElement("div")
            projectsPanel.classList = "projectsPanel panel"
            sidebar.appendChild(projectsPanel)
            let header = document.createElement("h1")
            header.textContent = "Projects"
            header.classList = "projectsHeader sidebarHeader"
            projectsPanel.appendChild(header)} 
            
            renderHeader()

            let deactivated = []

            let createNewProjectFunction = () => {

                let noCreate = () => {
                    removeInput()
                }

                let yesCreate = () => {
                let projectName = document.querySelector("#newProjNameInput")
                createNewProject(projectName)
                removeInput()
                refreshProjects()}

                let removeInput = () => {
                    let projectsPanel = document.querySelector(".projectsPanel")
                    let input = document.querySelector(".projectCreatorDiv")
                    projectsPanel.removeChild(input)
                    deactivated[0] = []

                }

                let renderProjectInput = () => {
                    if (deactivated[0] == true) {return}
                    let projectsPanel = document.querySelector(".projectsPanel")
                    let reference = document.querySelector(".newProjButton")
                    let projectCreatorDiv = document.createElement("div")
                    projectCreatorDiv.classList = "projectCreatorDiv projectButton"
                    projectsPanel.insertBefore(projectCreatorDiv,reference.nextSibling)
                    let name = document.createElement("input")
                    name.autocomplete = "off"
                    name.id = "newProjNameInput"
                    name.type = "text"
                    let yesButton = document.createElement("div")
                    yesButton.textContent = "✓"
                    yesButton.classList = "yesButton"
                    let noButton = document.createElement("div")
                    noButton.addEventListener("click",noCreate)
                    noButton.textContent = "X"
                    noButton.classList = "noButton"
                    projectCreatorDiv.appendChild(name)
                    projectCreatorDiv.appendChild(yesButton)
                    projectCreatorDiv.appendChild(noButton)
                    yesButton.addEventListener("click",yesCreate)
                    let projectText = document.querySelector("#newProjNameInput")
                    projectText.focus()
                    deactivated[0] = true

                }
                renderProjectInput()
            }

            let renderNewProjectButton = () => {
                let projectsPanel = document.querySelector(".projectsPanel")
                let buttonDiv = document.createElement("div")
                buttonDiv.classList = "newProjButton projectButton"
                let buttonText = document.createElement("p")
                buttonText.textContent = "Add project"
                let buttonImg = document.createElement("img")
                buttonImg.height = 25
                buttonImg.width = 25
                buttonImg.src = "https://img.icons8.com/ios/50/FFFFFF/plus--v1.png"
                projectsPanel.appendChild(buttonDiv)
                buttonDiv.appendChild(buttonImg)
                buttonDiv.appendChild(buttonText)
                buttonDiv.addEventListener("click",createNewProjectFunction)
        }

            let renderProjects = () => {

                let getExistingProjects = () => {
                    return (controllerObject.projects)
                }
                let projects = getExistingProjects()

                let renderProject = (project) => {
                    let projectsPanel = document.querySelector(".projectsPanel")
                    let projectDiv = document.createElement("div")
                    projectDiv.classList = "projectButton"
                    let projectImg = document.createElement("img")
                    projectImg.src = "https://img.icons8.com/ios-filled/50/FFFFFF/horizontal-line.png"
                    projectImg.height = 25
                    projectImg.width = 25
                    let projectText = document.createElement("p")
                    let projectDelete = document.createElement("button")
                    projectDelete.classList = "deleteButton"
                    projectDelete.textContent = "X"
                    projectText.textContent = project.projectName
                    projectsPanel.appendChild(projectDiv)
                    projectDiv.appendChild(projectImg)
                    projectDiv.appendChild(projectText)
                    projectDiv.appendChild(projectDelete)
                    return {projectDiv,projectDelete}
                }

                let addProjectFunctionality = (projectObject) => {
                    projectObject.projectDelete.addEventListener("click",deleteProj)
                }

                let getProjectByName = (name) => {
                    let project = controllerObject.projects.filter((project) => {
                        let textValue = name
                        // textValue = textValue.slice(0,textValue.length - 1)
                        return (project.projectName == textValue)})
                        if (project.length !== 0) return project[0]
                        else return null
                }

                let updateProjectSelection = () => {
                    let projectButtons = document.querySelectorAll(".projectButton")
                    projectButtons.forEach(project => {project.classList.remove("selectedProject")
                    project.isSelectedProject = false})
                    controllerObject.updateMain()
                    controllerObject.updateSecondary()
                }

                let renderProjectSelection = (sidebarDiv) => {
                    sidebarDiv.classList = "projectButton selectedProject"
                }

                let setInitialProjectSelection = () => {
                    if (controllerObject.selectedProject !== null) {renderProject(controllerObject.selectedProject.sidebarReference)}
                }

                let createProjectSelection = (e) => {
                    let getProjectName = () => {
                        let projectName = e.currentTarget.textContent
                        projectName = projectName.slice(0,-1) 
                        return projectName   
                    }
                    let projectName = getProjectName()
                    
                    let checkForDoubleClick = () => {
                        let outcome = false
                        if (controllerObject.selectedProject !== null)console.log(controllerObject.selectedProject)
                        if (controllerObject.selectedProject !== null && projectName == controllerObject.selectedProject.projectName) {
                            outcome = true
                        }
                        return outcome
                    }

                    let selectedProjectDiv = e.currentTarget

                    let handleDoubleClick = () => {
                        controllerObject.selectedProject.isSelectedProject = false
                        controllerObject.selectedProject.sidebarReference.classList.remove("selectedProject")
                        updateProjectSelection()
                        controllerObject.selectedProject = null
                        controllerObject.updateMain()
                        controllerObject.updateSecondary()

                    }
                               
                    if (checkForDoubleClick() == true) {
                        handleDoubleClick()
                    }
                    else if (e.target !== e.currentTarget) { /* separate x clicks and project clicks */
                        controllerObject.selectedProject = null
                        updateProjectSelection()
                        controllerObject.updateMain()
                        controllerObject.updateSecondary()

                    }
                    else {
                    let handleNewSelection = () => {
                        console.log(controllerObject.projects)
                        controllerObject.selectedProject = getProjectByName(projectName)
                        controllerObject.updateMain()
                        updateProjectSelection()
                        controllerObject.selectedProject.sidebarReference = selectedProjectDiv
                        renderProjectSelection(controllerObject.selectedProject.sidebarReference)}
                    handleNewSelection()

                    }
                    
                } 
                let addProjectSelection = (projectDiv) => {
                    projectDiv.addEventListener("click",createProjectSelection)}

                    let deleteProj = (e) => {
                        let removeFromDisplay = () => {
                        let parent = e.currentTarget.parentElement
                        projectsPanel.removeChild(parent)}

                        let deleteFromController = () => {
                        let projectName = e.currentTarget.parentNode.textContent
                        projectName = projectName.slice(0,-1)
                        controllerObject.projects.forEach(project => {
                            if (project.projectName == projectName) {controllerObject.projects.splice(controllerObject.projects.indexOf(project),1)}
                        });
                        controllerObject.selectedProject = null
                        console.table(controllerObject.projects)}
                        deleteFromController()
                        refreshProjects()
                    }

                    let addSidebarReferenceToController = (project,reference) => {
                        project.sidebarReference = reference
                    }

                    let renderTheProjects = () => {
                        projects.forEach(project => {
                            let projectRender = renderProject(project)
                            addSidebarReferenceToController(project,projectRender.projectDiv)
                            addProjectFunctionality(projectRender)
                            addProjectSelection(projectRender.projectDiv)
                        })}
                    renderTheProjects()


                let oldrenderProject = (project) => {

                    let projectName = project.projectName

                }
}

            let createNewProject = () => {
                let projName = document.querySelector("#newProjNameInput").value
                controllerObject.projects.push(
                    {projectName:projName,
                    projectDescription: "",
                    isSelectedProject: false,
                    sidebarReference: null,
                    tasks: []
                    })
            }

            let refreshProjects = () => {
                let removeProjects = () => {
                    let projectsPanel = document.querySelector(".projectsPanel")
                    let projectDivs = document.querySelectorAll(".projectButton")
                    projectDivs.forEach(div => {projectsPanel.removeChild(div)})
                }
                removeProjects()
                renderNewProjectButton()
                renderProjects()
            }


            renderNewProjectButton()
            renderProjects()

        }

        let createTagsPanel = () => {
            let tagsPanel = document.createElement("div")
            tagsPanel.classList = "tagsPanel panel"
            sidebar.appendChild(tagsPanel)
            let header = document.createElement("h1")
            header.textContent = "Tags"
            header.classList = "tagsHeader sidebarHeader"
            tagsPanel.appendChild(header) 

        }
        createFiltersPanel()
        createProjectsPanel()
        createTagsPanel()
    }
    createSidebar()

}
