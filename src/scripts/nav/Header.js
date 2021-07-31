import { 
    getMessages, 
    setIsDisplayingMessages, 
    setIsDisplayingMessagesForm } from "../data/provider.js"

export const TopNav = () => {
    const messages = getMessages()
    const usermessages = []

    messages.map(message => {
        if (message.recipientEmail == localStorage.getItem("gg_useremail")) {
            usermessages.push(message)
        }
    })

    let html = `
    
    <ul>
        <li><span class="notification"  id="write">Write</span></li>
        <li>
            <div  class="notification" >
                <span class="inbox" id="inbox">Inbox</span>
                <span class="badge">${usermessages.length}</span>
            </div >
        </li>    
        
        <li style="float:right">
            <a class="active" href="#logoff" id="logoutButton">Log Out</a>
        </li>
    </ul>
    `
    return html
}
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "inbox") {
        setIsDisplayingMessages()
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "displayM" } }))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "write") {
        setIsDisplayingMessagesForm()
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "logout" } }))
    }
})
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logoutButton") {
        localStorage.clear()
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "logout" } }))
    }
})