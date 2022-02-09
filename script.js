function getMessage(){
    let input = document.querySelector("input")
    let message = input.value
    return message
}

function renderMessage(){
    const section = document.querySelector("section")
    section.innerHTML += `<div class="message private">${getMessage()}</div>`
}