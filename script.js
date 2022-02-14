let person = []
document.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        sendMessage()
        console.log("enter")
    }
});
function getName(){
    const name = prompt("tell your name or username")
    if(name.length > 20){
        window.alert("Name invalid")
        setName()
    }
    return name
}

function setName(){
    const objectPerson = {
        name : getName()
    }
    person[0] = (objectPerson)
    postName()
}

function postName(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",person[0])
    promise.then(whenTrue)
    promise.catch(whenNameFalse)
}
function whenNameFalse(){
    window.alert("Name invalid")
    setName()
}
function postStatus(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",person[0])
    promise.then(whenTrue)
    promise.catch(whenFalse)
}
function verifyStats(){
    console.log('oi')
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
    section.innerHTML = ''
    for(i = 0; i < arrayMessages.length; i++){
        if(arrayMessages[i].type == 'status'){
            section.innerHTML += `<div class="message ${arrayMessages[i].type}" data-identifier="message">
            <span class="time">(${arrayMessages[i].time})</span> <span class="names">${arrayMessages[i].from}</span></span>${arrayMessages[i].text}
            </div>`
        } else {
            section.innerHTML += `<div class="message ${arrayMessages[i].type}" data-identifier="message">
            <span class="time">(${arrayMessages[i].time})</span>
            <span class="names">${arrayMessages[i].from}</span> <span>para<span class="to">${arrayMessages[i].to}:</span></span></span>
            <span class="message-text">${arrayMessages[i].text}</span>
            </div>`
        }
    }
}
function loadError(response){
    console.log(response)
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
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",person[1])
        promise.then(whenTrue)
        promise.catch(whenFalse)
}

function whenTrue(response){
    const infos = response.data
    searchMessages()
}

function whenFalse(response){
    console.log("deuruim")
    console.log(response.data) 
}

setName()
searchMessages()
setInterval(verifyStats,3000);
setInterval(postStatus,5000)
