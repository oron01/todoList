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

                    let projectName = project.projectName

                    let getProjectByName = (name) => {
                        let project = controllerObject.projects.filter((project) => {
                        let textValue = name
                        textValue = textValue.slice(0,textValue.length - 1)
                        return project.projectName == textValue})
                        console.log(project)
                        return project
                    }

                    let updateProjectSelection = () => {
                        let projectButtons = document.querySelectorAll(".projectButton")
                        projectButtons.forEach(project => {project.classList.remove("selectedProject")})
                        controllerObject.updateMain()
                        controllerObject.updateSecondary()
                    }

                    let renderProjectSelection = (sidebarDiv) => {
                        sidebarDiv.classList = "projectButton selectedProject"
                    }

                    let initialProjectSelection = () => {
                        if (controllerObject.selectedProject !== null) {renderProject(controllerObject.selectedProject.sidebarReference)}
                    }

                    let createProjectSelection = (e) => {

                        alert(e.currentTarget.textContent)
                        let projectName = e.currentTarget.textContent
                        let selectedProjectDiv = e.currentTarget
                        
                        if (controllerObject.selectedProject !== null) {renderProject(controllerObject.selectedProject.sidebarReference)}
                        
                        if (controllerObject.selectedProject !== null && controllerObject.selectedProject.projectName == getProjectByName(projectName).projectName) {
                            alert("a")
                            alert(controllerObject.selectedProject.sidebarReference + "ASdasd")
                            controllerObject.selectedProject.sidebarReference.classList.remove("selectedProject")
                            controllerObject.selectedProject.isSelectedProject = false
                            controllerObject.selectedProject = null
                            updateProjectSelection()
                        }
                        else {
                        alert(getProjectByName(projectName).projectName + "aba")
                        controllerObject.selectedProject = getProjectByName(projectName)
                        controllerObject.updateMain()
                        updateProjectSelection()
                        controllerObject.selectedProject.sidebarReference = selectedProjectDiv
                        renderProjectSelection(controllerObject.selectedProject.sidebarReference)}
                    } 
                    projectDiv.addEventListener("click",createProjectSelection)

                    let deleteProj = (e) => {
                        let removeFromDisplay = () => {
                        let parent = e.currentTarget.parentElement
                        projectsPanel.removeChild(parent)}

                        let deleteFromController = () => {
                        controllerObject.projects.forEach(project => {
                            if (project.projectName == projectName) {controllerObject.projects.splice(controllerObject.projects.indexOf(project),1)}
                        });
                        controllerObject.selectedProject = null
                        console.table(controllerObject.projects)}
                        deleteFromController()
                        refreshProjects()
                    }
                    projectDelete.addEventListener("click",deleteProj)

                    return {projectDiv}
                }
                let addSidebarReferenceToController = (project,reference) => {
                    project.sidebarReference = reference

                }
                projects.forEach(project => {
                    let projectRender = renderProject(project)
                    addSidebarReferenceToController(project,projectRender.projectDiv)
                    console.log(project)

                
                })

            }

            let createNewProject = () => {
                let projName = document.querySelector("#newProjNameInput").value
                controllerObject.projects.push({projectName:projName})
            }

            let refreshProjects = () => {
                let removeProjects = () => {
                    let projectsPanel = document.querySelector(".projectsPanel")
                    let projectDivs = document.querySelectorAll(".projectButton")
                    projectDivs.forEach(div => {projectsPanel.removeChild(div)})
                }
                removeProjects()
                createNewProjectButton()
                renderProjects()
            }

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

                let createProjectInput = () => {
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
                createProjectInput()
            }

            let createNewProjectButton = () => {
                let deactivated = false
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

            createNewProjectButton()
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
