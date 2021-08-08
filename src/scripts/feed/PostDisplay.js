import { getPosts } from "../data/provider.js"
import { deletePost } from "../data/provider.js"
import {setIsShowingFavorites, getFavPosts,  } from "../data/provider.js"


export const displayAllPosts = () => {
    const posts = getPosts()
 
    let html = "<div>"
    const listItems = posts.map(post => {
            return `<div>
                <div name="post" class="post" value="${post.id}" /> 
                    
                    <div class="post_title">${post.postTitle}</div>
                    <br>
                    <img src="${post.postURL}" alt="${post.postTitle}">                
                    <br>
                    ${post.postStory}
                    <br>
                    Posted by ${post.authorName} ${post.date}
                    <br>
                    <br>

                    <div class=all_buttons">
                        <button class="post__delete"
                            id="post--${post.id}">
                            Delete
                        </button>
                        <button class="favorite_post_button" id="favButton--${post.id}">
                            Favorite
                        </button> 
                    </div>
                </div>`

    })

    html += listItems.join("")
    html += "</div>"
    return html
}
const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("post--")) {
        const [, postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelButton") {
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "cancelButton" } }))
    }
})

export const  displayFavPosts = () => {
    const favPosts = getFavPosts()

    let html = "<div>"
    const favList = favPosts.map(favPost => {
    return `<div>
            <div name="post" class="favPost" value="${favoritePost.id}" /> 
                    ${favPost.postTitle}
                    <br>
                    <img src="${favPost.postURL}" alt="${favPost.postTitle}">
                    <br>
                    ${favPost.postStory}
                    <br>
                    Posted by ${favPost.authorName} ${favPost.date}
                </div>
                <button class="fav__delete"
                        id="fav--${favPost.id}">
                    Delete
               </button>
          </div>`
})

html += favList.join("")
html += "</div>"
return html
}


document.addEventListener("click", click => {
    if (click.target.id.startsWith("fav--")) {
        const [, postId] = click.target.id.split("--")
        favoritePost(parseInt(postId))
        //set show fav in provider.js
        //post like/fav
    }
})
    
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "favButton") {
        const favUserauthorEmail = localStorage.getItem("gg_useremail")
        const favPostTitle = document.querySelector("input[name='Title']").value
        const favPostURL = document.querySelector("input[name='gifURL']").value
        const favPostStory = document.querySelector("textarea[name='storySpace']").value

        const favToday = new Date();
        const favDate = favToday.getFullYear() + '-' + (favToday.getMonth() + 1) + '-' + favToday.getDate();
        const favTime = favToday.getHours() + ":" + favToday.getMinutes() + ":" + favToday.getSeconds();
        const favUserDate = favDate + ' ' + favTime;

        // Make an object out of the user input
        const favPostToSendToAPI = {
            authorName: favUserauthorEmail,
            postTitle: favPostTitle,
            postURL: favPostURL,
            postStory: favPostStory,
            date: favUserDate
        }

        // Send the data to the API for permanent storage
        favoritePosts(favPostToSendToAPI)
        setIsShowingFavorites()
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "favorite_post" } }))
    }
})