let loggedInLinks = document.getElementsByClassName("show-when-logged-in");
let loggedOutLinks = document.getElementsByClassName("show-when-logged-out");
let forum_titles;
let forum_container = document.querySelector("#forum-container");

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

// load all forums
axios.get("../php/get-all-forums.php").then(res => {
    let forums = res.data;
    let forum_contents = ``;
    forums.forEach(forum => {
        forum_contents += `
            <div class="col-sm-10 shadow-sm p-3 bg-white rounded individual-post">
                <div class="row justify-content-center pl-2 pr-2">
                    <div class="col-12">
                        <h3 class = "post-title">
                            ${ forum.title }
                            <span class = "post-id" style = "display: none;">${ forum.id }</span>
                        </h3>
                    </div>
                    <div class="col-12 bg-light pl-3 pt-2 pb-2 mt-2 post-details">
                        <div class="row">
                            <div class="col-sm-12 col-md-8">
                                <p class="text-black-50">
                                    <b class = "category-text">${ forum.category }</b>
                                    <span class="posted-pre-text">Posted by </span>
                                    <span class = "posted-user">${ forum.uname }</span> on
                                    <span id = "posted-date-time">${ forum.date }</span>
                                </p>
                            </div>
                            <div class="col-sm-12 col-md-4 vote-btns-container">
                                <a class="vote-btn">
                                    <i class="fa fa-arrow-up text-primary">
                                        <span style="margin-left: 3px;" id = "upvote-text">100</span>
                                    </i>
                                </a>
                                <a class="vote-btn">
                                    <i class="fa fa-arrow-down text-danger">
                                        <span style="margin-left: 3px;" id = "downvotevote-text">50</span>
                                    </i>
                                </a>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    forum_container.innerHTML = forum_contents;
    forum_titles = document.querySelectorAll(".post-title");
    Array.from(forum_titles).forEach((forum_title) => {
        forum_title.addEventListener("click", (e) => {
            let id = e.target.getElementsByClassName("post-id")[0].textContent;
            console.log(id);
            // window.location.href = "post.html";
        });
    });
});
