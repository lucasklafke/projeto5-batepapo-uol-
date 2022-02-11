let person = []
const timer = setInterval(verifyStats,5000);
function getName(){
    const name = prompt("tell your name or username")
    return name
}

function setName(){
    const objectPerson = {
        name : getName()
    }
    person.push(objectPerson)
    postName()
}

function postName(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",person[0])
    promise.then(whenTrue)
    promise.catch(whenFalse)
}

function verifyStats(){
    searchMessages()
}

function searchMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promise.then(loadMessages)
    promise.catch(loadError)
}
function loadMessages(response){
    const arrayMessages = response.data
    const section = document.querySelector("section")
    for(i = 0; i < arrayMessages.length; i++){
        section.innerHTML += `<div class="message ${arrayMessages[i].type}">
        <span>(${arrayMessages[i].time}) <span class="names">${arrayMessages[i].from}</span></span>${arrayMessages[i].text}
        </div>`
    }
}
function loadError(response){
    console.log(response)
}
setName()
searchMessages()



function getMessage(){
    let input = document.querySelector("input")
    let message = input.value
    return message
}
function createPerson(){
    const postedPerson = {
        from: person[0].name,
        to: "todos",
        text: getMessage(),
        type: "message",
    }
    return postedPerson
}

function sendMessage(){
    createPerson()
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",createPerson())
    promise.then(whenTrue)
    promise.catch(whenFalse)
    searchMessages()
}

function whenTrue(response){
    console.log(response.status)
    console.log("deubom")
}

function whenFalse(response){
    const statusCode = response;
    statusCode.response.status
    console.log("deuruim")
    console.log(statusCode.response.status) 
}