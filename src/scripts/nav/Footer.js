import { getPosts, getShowFavorites, getUsers, setChosenDate, setChosenUser,getAllPosts } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("change", event => {
  if (event.target.id === "select__date") {
    const theSelectedIndex = document.getElementById("select__date").options.selectedIndex
    const selectedDate = document.getElementById('select__date').options[theSelectedIndex].label

    setChosenDate(selectedDate)
    document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged", { detail: { page: "datefilter" } }))
  }
})

// event listener for post by user
applicationElement.addEventListener("click", event => {
  if (event.target.id === "select__user") {
    setChosenDate(event.target.value);
    applicationElement.querySelectorAll(new CustomEvent("stateChanged"));

    const theSelectedIndex = document.getElementById("select__user").options.selectedIndex
    const selectedUser = document.getElementById('select__user').options[theSelectedIndex].text

    const dataToSendUser = {
      posts: selectedUser
    }
    // this part isn't working
    getPosts(dataToSendUser)
  }
})


export const Footer = () => {

  let html =

    // This should display posts since dropdown selection
    `<select id="select__date" class='option posts__since' >
      <option class="dateSelection__select" disabled selected>Select a Date</option>
    `

  const posts = getAllPosts()

  const postHtml = posts.map(post => {

    return `<option class="dateSelection__select">${post.date}</option>`

  })
  html += postHtml.join('')

  html += `</select>`

  html += "<select id='select__user' class='option choose__user'><option selected disabled>Posts by User</option>"
  const users = getUsers()

  html += users.map(user => {
    return `<option class="userSelection__select">${user.email}</option>`
  }).join('')

  html += "</select>"
  html += `<label class='show__favorites'>Show Favorites Only</label>
    <span>&#128151;</span>
    <input type='checkbox' id='showFavoritesOnly' name='showFavoritesOnly' value='showFavoritesOnly'>`

  return html
}

