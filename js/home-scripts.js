let loggedInLinks = document.getElementsByClassName("show-when-logged-in");
let loggedOutLinks = document.getElementsByClassName("show-when-logged-out");
let postsDiv = document.querySelectorAll(".individual-post");

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

Array.from(postsDiv).forEach((postDiv) => {
    postDiv.addEventListener("click", (e) => {
        window.location.href = "post.html";
    });
});