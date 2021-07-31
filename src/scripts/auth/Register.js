import { getUsers } from "../data/provider.js"
import { fetchUsers } from "../data/provider.js"
import { registerUserRequest } from "../data/provider.js"

export const registerUser = 
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "registerButton") {
        fetchUsers().then(
            () => {
                let createUser = null
                const userState = getUsers()

                const email = document.querySelector("input[name='email']").value
                const password = document.querySelector("input[name='password']").value
                      
                if (userState.find(user => user.email === email)) {
                    return window.alert("You are already registered, please login")
                }
                else {registerUserRequest({email: email, password: password})}
            }
        )
    }
})

