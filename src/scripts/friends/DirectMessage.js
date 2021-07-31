import { getMessages } from "../data/provider.js"
import { deleteMessages } from "../data/provider.js"

export const displayAllMessages = () => {
    const messages = getMessages()
    const usermessages=[]
    messages.map(message => {
        if (message.recipientEmail==localStorage.getItem("gg_useremail")) {
            usermessages.push(message) }})
    let html = "<div>"
    // Use .map() for converting objects to <li> elements
    const listItems = usermessages.map(message => {
        if (message.recipientEmail==localStorage.getItem("gg_useremail")) {
            return `<div>
            <div name="request" class="directMessage" value="${message.id}" /> 
                <p>
                Dear ${message.recipientName},
                <br>
                <br>
                ${message.letter}
                <br>
                <br>
                Sincerely, ${message.authorName}
                    <div class = "date">
                    sent on ${message.date}
                    </div>
                </p>
                
                <button class="message__delete"
                        id="message--${message.id}">
                    Delete
               </button>
        </div>`
        } else {
            '<p>you have no message</p>'
        }

    })
    // Join all of the strings in the array into a single string
    html += listItems.join("")
    html += "</div>"
    return html
}
const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("message--")) {
        const [, messageId] = click.target.id.split("--")
        deleteMessages(parseInt(messageId))
    }
})