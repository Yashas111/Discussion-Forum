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

let queryPart = window.location.href.split("?")[1];
let linkType = "";
if(queryPart) {
    linkType = queryPart.split("=")[0];
}
let phpUrl = "../php/get-all-forums.php";
if(linkType === "category") {
    let category = window.location.href.split("=")[1];
    if(category === "education")
        phpUrl = "../php/get-forums.php?category=Education";
    else if(category === "sports")
        phpUrl = "../php/get-forums.php?category=Sports";
    else if(category === "politics")
        phpUrl = "../php/get-forums.php?category=Politics";
    else if(category === "games")
        phpUrl = "../php/get-forums.php?category=Games";
    else if(category === "books")
        phpUrl = "../php/get-forums.php?category=Books";
} else if(linkType === "search") {
    let searchVal = window.location.href.split("=")[1];
    phpUrl = "../php/get-forums.php?value=" + searchVal;
}

let forums;

// load all forums
axios.get(phpUrl).then(res => {
    console.log(res.data);
    forums = res.data;
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
                                <a class="vote-btn upvote-btn">
                                    <i class="fa fa-arrow-up text-primary">
                                        <span style="margin-left: 3px;" class = "upvote-text">${ forum.upvote_count }</span>
                                        <span class = "post-id" style = "display: none;">${ forum.id }</span>
                                    </i>
                                </a>
                                <a class="vote-btn downvote-btn">
                                    <i class="fa fa-arrow-down text-danger">
                                        <span style="margin-left: 3px;" class = "downvote-text">${ forum.downvote_count }</span>
                                        <span class = "post-id" style = "display: none;">${ forum.id }</span>
                                    </i>
                                </a>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    let forum_container = document.querySelector("#forum-container");
    forum_container.innerHTML = forum_contents;
    let forum_titles = document.querySelectorAll(".post-title");
    Array.from(forum_titles).forEach((forum_title) => {
        forum_title.addEventListener("click", (e) => {
            let id = e.target.getElementsByClassName("post-id")[0].textContent;
            console.log(id);
            window.location.href = "post.html?id=" + id;
        });
    });

    let upvote_btns = document.getElementsByClassName("upvote-btn");
    Array.from(upvote_btns).forEach(btn => {
        btn.addEventListener("click", (e) => {
            let upvote_text = e.target.querySelector(".upvote-text");
            let forumId = e.target.querySelector(".post-id").textContent;
            console.log(upvote_text.textContent, forumId);
            axios.get("../php/update-forum-vote.php?forumid=" + forumId + "&votetype=upvote_count")
                .then(res => {
                    if(res.data == 200) {
                        upvote_text.innerHTML = Number(upvote_text.textContent) + 1;
                    }
                });
        });
    });

    let downvote_btns = document.getElementsByClassName("downvote-btn");
    Array.from(downvote_btns).forEach(btn => {
        btn.addEventListener("click", (e) => {
            let downvote_text = e.target.querySelector(".downvote-text");
            let forumId = e.target.querySelector(".post-id").textContent;
            console.log(downvote_text.textContent, forumId);
            axios.get("../php/update-forum-vote.php?forumid=" + forumId + "&votetype=downvote_count")
                .then(res => {
                    if(res.data == 200) {
                        downvote_text.innerHTML = Number(downvote_text.textContent) + 1;
                    }
                });
        });
    });
});


let search_input = document.getElementById("searchid");
let search_form = document.getElementById("search-form");
search_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchVal = search_input.value.toLowerCase().split(" ").join("+");
    window.location.href = "./home.html?search=" + searchVal;
});