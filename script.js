let person = []
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
function postStatus(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",person[0])
    promise.then(whenTrue)
    promise.catch(whenFalse)
}
function verifyStats(){
    console.log("entrei")
    searchNewMessages()
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
        if(arrayMessages[i].type == 'status'){console.log(arrayMessages[1])
            section.innerHTML += `<div class="message ${arrayMessages[i].type}">
            <span class="time">(${arrayMessages[i].time})</span> <span class="names">${arrayMessages[i].from}</span></span>${arrayMessages[i].text}
            </div>`
        } else {
            section.innerHTML += `<div class="message ${arrayMessages[i].type}">
            <span class="time">(${arrayMessages[i].time})</span>
            <span class="names">${arrayMessages[i].from}</span> <span>para <span class="to">${arrayMessages[i].to}:</span></span> </span>${arrayMessages[i].text}
            </div>`
        }
    }
}
function loadError(response){
    console.log(response)
}
function searchNewMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promise.then(loadNewMessages)
    promise.catch(loadError)
}
function loadNewMessages(response){
    const section = document.querySelector("section")
    section.innerHTML = ''
    const arrayMessages = response.data
    for(i = 0; i < arrayMessages.length; i++){
        console.log(arrayMessages.type)
        if(arrayMessages[i].type == 'status'){
            section.innerHTML += `<div class="message ${arrayMessages[i].type}">
            <span class="time">(${arrayMessages[i].time})</span> <span class="names">${arrayMessages[i].from}</span></span>${arrayMessages[i].text}
            </div>`
        } else {
            section.innerHTML += `<div class="message ${arrayMessages[i].type}">
            <span class="time">(${arrayMessages[i].time})</span>
            <span class="names">${arrayMessages[i].from}</span> <span>para <span class="to">${arrayMessages[i].to}:</span></span> </span>${arrayMessages[i].text}
            </div>`
        }
    }
}
function getMessage(){
    let input = document.querySelector("input")
    let message = input.value
    return message
}
function createPerson(){
    let postedPerson = {
        from: person[0].name,
        to: "todos",
        text: getMessage(),
        type: "message",
    }
    if(person.length == 1){
        person.push(postedPerson)
    } else{
        person[1] = postedPerson
    }
}

function sendMessage(){
        createPerson()
        console.log(person[1])
        console.log("hum")
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",person[1])
        promise.then(whenTrue)
        promise.catch(whenFalse)
}

function whenTrue(response){
    const infos = response.data
    console.log(infos)
    setInterval(verifyStats,3000);
    searchNewMessages()
}

function whenFalse(response){
    console.log("deuruim")
    console.log(response.data) 
}
setName()
searchMessages()
setInterval(postStatus,5000)