let loggedInLinks = document.getElementsByClassName("show-when-logged-in");
let loggedOutLinks = document.getElementsByClassName("show-when-logged-out");

let user = localStorage.getItem("user");

if(user) {
    Array.from(loggedInLinks).forEach((link) => {
        link.style.display = "";
    });
    Array.from(loggedOutLinks).forEach((link) => {
        link.style.display = "none";
    });
} else {
    Array.from(loggedInLinks).forEach((link) => {
        link.style.display = "none";
    });
    Array.from(loggedOutLinks).forEach((link) => {
        link.style.display = "";
    });
}

document.querySelector("#logout-btn").addEventListener("click", (e) => {
    localStorage.removeItem("user");
});

let forum_title = document.getElementById("post-title");
let forum_description = document.getElementById("post-description");
let forum_category = document.getElementById("category-text");
let forum_author = document.getElementById("posted-user");
let forum_date = document.getElementById("posted-date-time");
let forum_upvote_text = document.getElementById("upvote-text");
let forum_downvote_text = document.getElementById("downvote-text");

let idQuery = window.location.href.split("?")[1];

axios.get("../php/post.php?" + idQuery).then(res => {
    console.log(res.data);
    forum_title.innerHTML = res.data.title;
    forum_description.innerHTML = res.data.description;
    forum_category.innerHTML = res.data.category;
    forum_author.innerHTML = res.data.uname;
    forum_date.innerHTML = res.data.date;
    forum_upvote_text.innerHTML = res.data.uv_count;
    forum_downvote_text.innerHTML = res.data.dv_count;
});

let comment_form = document.getElementById("comment-form");
let comment_input = document.getElementById("commentid");
comment_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(comment_input.value);
    if(comment_input.value !== "") {
        
    }
});