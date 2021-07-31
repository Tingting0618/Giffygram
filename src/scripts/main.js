import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"


const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    if (user) {
        fetchUsers().then(() => {
            fetchMessages().then(() => {
                fetchPosts().then(
                    () => {
                        applicationElement.innerHTML = GiffyGram()
                    })
            })
        })
    } else {
        applicationElement.innerHTML = LoginForm()
    }
}

renderApp()

applicationElement.addEventListener(
    "stateChanged",
    CustomEvent => {
        renderApp(),
        console.log(CustomEvent.detail.page)
    }
)
