import { favoritePost, savePosts, setIsDisplayingGifForm } from "../data/provider.js"


export const postButton  = () => {
    let html = `
    <br/>
    
    <button id="postButton">Have a gif to post?</button>
    
    </br>`
    return html
}

export const gifForm = () => {
    let html =`
    <section class="gifContainer">
        <div class="field">
            <input type="text" name="Title" placeholder="Title" class="input" />
        </div>

        <br/>

        <div class="field">
            <input type="text" name="gifURL" placeholder="URL of gif" class="input" />
        </div>

        <br/>

        <div class="field">
          <textarea class="gifStoryInput" type="text" name="storySpace" row="8" col="50" placeholder="Story behind your gif"></textarea>
        </div>
    </section>

    <button  id="saveButton">Save</button>
    <button  id="cancelButton">Cancel</button>
    `
    return html
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "postButton") {
        setIsDisplayingGifForm()
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "postForm_display" } }))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveButton") {
        const userauthorEmail = localStorage.getItem("gg_useremail")
        const postTitle = document.querySelector("input[name='Title']").value
        const postURL = document.querySelector("input[name='gifURL']").value
        const postStory = document.querySelector("textarea[name='storySpace']").value

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const userDate = date + ' ' + time;

        // Make an object out of the user input
        const postToSendToAPI = {
            authorName: userauthorEmail,
            postTitle: postTitle,
            postURL: postURL,
            postStory: postStory,
            date: userDate
        }

        // Send the data to the API for permanent storage
        savePosts(postToSendToAPI)
        setIsDisplayingGifForm()
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "post_save_Form" } }))
    }
})

// document.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id === "favoriteButton") {
//         const [,postId] = click.target.id.split("--")
//         favoritePost(parseInt(postId))
//         document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "favoriteButton" } }))
//     }
// })

// export const Favs = () => {
//     const favPost = favoritePost(parseInt(id))
//     let html = `
//       <h1>Favorite Gifs</h1>
//       <div>
//         <img src="${favPost.likes}" />
//       </div>
//   `
//     return html
// }

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelButton") {
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "cancelButton" } }))
    }
})