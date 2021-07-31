import { sendMessage, getUsers } from "../data/provider.js"

export const MessageForm = () => {

    const users = getUsers()

    let html = `
        <div class="field">
            <label class="label" for="recipient">Recipient:</label>
            <select id="recipientSelection"  class="select">`
    const listUsers = users.map(user => {
        return `<option value="${user.email}" /> ${user.email}</option>`
    })

    html += listUsers.join("")
    html += `</select>
    </div>

    <div class="field">
        <label class="label" for="letter">Message:</label>
        <textarea type="text" name="letter" class="input" rows="8" cols="50">
        </textarea>
    </div>

    <button class="button" id="submitMessage">Send Message</button>
    <button class="button" id="cancelMessage">Cancel Message</button>`
    
    return html
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitMessage") {
        // Get what the user typed into the form fields

        //const userId = foundUser.id
        //const userauthorpartName = foundUser.text
        const userauthorEmail = localStorage.getItem("gg_useremail")
        //const userauthorName = userauthorpartName + ' (' + userauthorEmail + ")"

        const userLetter = document.querySelector("textarea[name='letter']").value

        const theSelectedIndex2 = document.getElementById("recipientSelection").options.selectedIndex
        const userRecipientName = document.getElementById('recipientSelection').options[theSelectedIndex2].text
        const userRecipientEmail = document.getElementById('recipientSelection').options[theSelectedIndex2].value

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const userDate = date + ' ' + time;

        // Make an object out of the user input
        const dataToSendToAPI = {
            authorName: userauthorEmail,
            letter: userLetter,
            recipientName: userRecipientName,
            recipientEmail: userRecipientEmail,
            date: userDate
        }

        // Send the data to the API for permanent storage
        sendMessage(dataToSendToAPI)

    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelMessage") {
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "cancelMessage" } }))
    }
})

