const API_KEY = 'eb0a9dda9b3f97f9d44ffa3ebe6b3140'
const BASE_URL = `wss://socketsbay.com/wss/v2/1/${API_KEY}/`

let websocket = new WebSocket(BASE_URL);
let log = document.getElementById('log')

function createMessage (msg, type) {
    return `<span class="${type}">${msg}</span>`
}
function clearHistory() {
    localStorage.setItem('history', '')
    log.innerHTML = localStorage.getItem('history')
    window.location.replace(window.location.href)
}
websocket.onopen = function() {
    log.innerHTML += createMessage('System: WebSocket is open', 'System')
    if(localStorage.getItem('history')) {
        log.innerHTML = localStorage.getItem('history')
    }
};
websocket.onclose = function() {
    log.innerHTML += createMessage('System: WebSocket is close', 'System')
};
websocket.onmessage = function(event) {
    log.innerHTML += createMessage(event.data, 'income')
    localStorage.setItem('history', log.innerHTML)
};

document.forms[0].addEventListener('submit', function () {
    event.preventDefault()
    let userName = localStorage.getItem('userName')
    if(!userName) {
        userName = prompt('Enter your name')
    }
    if(userName) {
        localStorage.setItem('userName', userName)
        websocket.send(`${userName}: ${event.target.elements.message.value}`)
        log.innerHTML += createMessage(`You: ${event.target.elements.message.value}`, 'outcome')
        localStorage.setItem('history', log.innerHTML)
        event.target.reset()
    }
})


