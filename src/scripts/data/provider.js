const applicationState = {
    users: [],
    messages: [],
    isShowingGifForm:false,
    posts:[],
    likes:[],
    currentUser: {},
    isShowingMessages:false,
    isShowingMessagesForm: false,
    isShowingGifForm: false,
    isShowfavorites:false,
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false,
        chosenDate: null
    }
}
//create fx to set show favs

const apiURL = "http://localhost:8088"
export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(
            (response) => {
                const parsedData = response.json()
                return parsedData
            }
        )
        .then(
            (serviceUsers) => {
                applicationState.users = serviceUsers
            }
        )
}
export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(
            (response) => {
                const parsedData = response.json()
                return parsedData
            }
        )
        .then(
            (serviceMessages) => {
                applicationState.messages = serviceMessages
            }
        )
}

export const getIsDisplayingMessages = () => {
    return applicationState.isShowingMessages
}
export const setIsDisplayingMessages = () => {
    applicationState.isShowingMessages = !applicationState.isShowingMessages
}


export const getIsDisplayingMessagesForm = () => {
    return applicationState.isShowingMessagesForm 
}
export const setIsDisplayingMessagesForm = () => {
    applicationState.isShowingMessagesForm = !applicationState.isShowingMessagesForm
}

export const getUsers = () => {
    return applicationState.users.map(user => ({ ...user }))
}

export const getMessages = () => {
    return applicationState.messages.map(message => ({ ...message }))
}

export const getIsDisplayingGifForm = () => {
    return applicationState.isShowingGifForm
}
export const setIsDisplayingGifForm = () => {
    applicationState.isShowingGifForm= !applicationState.isShowingGifForm
}

export const getIsShowingFavorites = () => {
    return applicationState.isShowingFavorites
}
export const setIsShowingFavorites = () => {
    applicationState.isShowingFavorites = !applicationState.isShowingFavorites
}

export const deleteMessages = (id) => {
    return fetch(`${apiURL}/messages/${id}`, { method: "DELETE" })
        .then(
            () => {
                const applicationElement = document.querySelector(".giffygram")
                applicationElement.dispatchEvent(new CustomEvent("stateChanged", {detail: {page:"deleteMessage" } }))
            }
        )
}

export const registerUserRequest = (newUser) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }
    return fetch(`${apiURL}/users`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            return window.alert("Successful")
            //applicationElement.dispatchEvent(new CustomEvent("stateChanged", {detail: {page:"UserRegistered" } }))
        })
}

export const sendMessage = (userMessage) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userMessage)
    }

    return fetch(`${apiURL}/messages`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            const applicationElement = document.querySelector(".giffygram")
            applicationElement.dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "sendMessage" } }))
        })
}

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(
            (response) => {
                const parsedData = response.json()
                return parsedData
            }
        )
        .then(
            (servicePosts) => {
                applicationState.posts = servicePosts
            }
        )
}
export const getAllPosts = () => {       
    return applicationState.posts.map(post => ({ ...post }))
}
export const getPosts = () => {       
    if (applicationState.feed.chosenDate) {
  
        // filter by chosenDAte
        const filteredposts=[]
        applicationState.posts.map(post => {
        if (post.date === applicationState.feed.chosenDate){
            filteredposts.push(post)
        }})
        return filteredposts
       // let posts = filteredposts.map(object => ({ ...object }))
       // posts = posts.filter((post) => {post.date === applicationState.feed.chosenDate})
    }else{
        return applicationState.posts.map(post => ({ ...post }))

    }
    
}


export const savePosts = (userPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userPost)
    }
    return fetch(`${apiURL}/posts`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        const applicationElement = document.querySelector(".giffygram")
        applicationElement.dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "savePost" } }))
    })
}

export const deletePost = (id) => {
    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
        .then(
            () => {
                const applicationElement = document.querySelector(".giffygram")
                applicationElement.dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "deletePost" } }))
            }
        )
}

export const favoritePost = (id) => {
    const fetchFavorites = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userId": parseInt(localStorage.getItem("gg_user")
            ),
            "postId": id
        })
    }

    return fetch(`${apiURL}/likes`, fetchFavorites)
    .then(response => response.json())
    .then(() => {
        const applicationElement = document.querySelector('.giffygram')
        applicationElement.dispatchEvent(new CustomEvent("statchanged", {detail: {page: "PostDisplay"}}))
    })
}

export const fetchLikes = () => {
    return fetch(`http://localhost:8088/likes`)
        .then(response => response.json())
        .then(
            (showLikes) => {
                applicationElement.likes = (showLikes)
            }
        )
}

export const getFavPosts = () => {
    return applicationElement.likes.map(like => ({ ...like }))
}

export const getLikes = () =>  {
    return applicationState.likes.map(like => ({ ...like}))
}

export const getShowFavorites = () => {
    return applicationState.feed.map(displayFavorite => ({ ...displayFavorite}))
}

export const getChosenUser = () => {
    return applicationState.feed.chosenUser
}

export const setChosenUser = (id) => {
    applicationState.giffygram.users = id
}

export const setChosenDate = (date) => {
    applicationState.feed.chosenDate = date
} 

// export const toggleFavoritesOnly = (id) => {
//     document.querySelector('.btn').addEventListener('click', 
//     })
// }
