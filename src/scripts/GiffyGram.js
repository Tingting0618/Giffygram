import { MessageForm } from "./message/MessageForm.js"
import { displayAllMessages } from "./friends/DirectMessage.js"
import {getIsDisplayingMessagesForm,getIsDisplayingMessages,getIsDisplayingGifForm}from "./data/provider.js"
import { TopNav } from "./nav/Header.js"
import {gifForm,postButton} from "./feed/PostList.js"
import {displayAllPosts} from "./feed/PostDisplay.js"
import { Footer } from "./nav/Footer.js"

export const GiffyGram = () => {

    let html = "<h1>Giffygram</h1>"
    html += TopNav()
    if (getIsDisplayingMessagesForm()){
        html += MessageForm()
    }
    if (getIsDisplayingMessages()){
        html += displayAllMessages()
    }

    html += postButton()
    if (getIsDisplayingGifForm()){
    html += gifForm()
    }
    html +=displayAllPosts()

    html += Footer()
    
    return html
}


