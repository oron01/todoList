export let createContainer = () => {
    let body = document.querySelector("body")
    let container = document.createElement("div")
    container.classList = "container"
    body.appendChild(container)
    let background = document.createElement("div")
    background.classList = "background"
    body.appendChild(background)
}
