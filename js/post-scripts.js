const encodeForm = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

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
let forum_upvote_text = document.getElementById("forum-upvote-text");
let forum_downvote_text = document.getElementById("forum-downvote-text");

let idQuery = window.location.href.split("?")[1];
let forumId = idQuery.split("=")[1];

axios.get("../php/post.php?" + idQuery).then(res => {
    console.log(res.data);
    forum_title.innerHTML = res.data.title;
    forum_description.innerHTML = res.data.description;
    forum_category.innerHTML = res.data.category;
    forum_author.innerHTML = res.data.uname;
    forum_date.innerHTML = res.data.date;
    forum_upvote_text.innerHTML = res.data.upvote_count;
    forum_downvote_text.innerHTML = res.data.downvote_count;
});

let forum_upvote_btn = document.getElementById("forum-upvote-btn");
forum_upvote_btn.addEventListener("click", (e) => {
    let upvote_text = e.target.querySelector("#forum-upvote-text");
    console.log(upvote_text.textContent, forumId);
    axios.get("../php/update-forum-vote.php?forumid=" + forumId + "&votetype=upvote_count")
        .then(res => {
            if(res.data == 200) {
                upvote_text.innerHTML = Number(upvote_text.textContent) + 1;
            }
        });
});
let forum_downvote_btn = document.getElementById("forum-downvote-btn");
forum_downvote_btn.addEventListener("click", (e) => {
    let downvote_text = e.target.querySelector("#forum-downvote-text");
    console.log(downvote_text.textContent, forumId);
    axios.get("../php/update-forum-vote.php?forumid=" + forumId + "&votetype=downvote_count")
        .then(res => {
            if(res.data == 200) {
                downvote_text.innerHTML = Number(downvote_text.textContent) + 1;
            }
        });
});

let comment_form = document.getElementById("comment-form");
let comment_input = document.getElementById("commentid");
comment_form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(user) {
        let comment_text = comment_input.value;
        let [email, uname] = user.split("|");
        let dateStamp = Date(Date.now()).toString().split(" ");
        let date = dateStamp[1] + " " + dateStamp[2] + ", " + dateStamp[3];

        let data = { forumId, comment_text, email, uname, date };

        axios.post("../php/add-comment.php", encodeForm(data), {headers: {'Accept': 'application/json'}})
            .then((res) => {
                if(res.data == 200) {
                    window.location.href = window.location.href;
                }
            })
    } else {
        alert("You need to login to comment!");
    }
});

let comment_container = document.getElementById("comment-container");
axios.get("../php/comment.php?" + idQuery).then(res => {
    console.log(res.data);
    let comments = res.data;
    let comment_contents = "";
    comments.forEach(comment => {
        comment_contents += `
            <div class="row justify-content-center bg-light comment-container">
                <div class="col-12">
                    <p id = "comment-text">
                        ${ comment.text }
                    </p>
                </div>
                <div class="col-12 pl-3 pt-2 pb-2">
                    <div class="row">
                        <div class="col-sm-12 col-md-8">
                            <p class="text-black-50">
                                <span class="posted-pre-text">Posted by </span>
                                <span id = "commented-user">${ comment.uname }</span> on
                                <span id = "commented-date-time">${ comment.date }</span>
                            </p>
                        </div>
                        <div class="col-sm-12 col-md-4 vote-btns-container">
                            <a class="vote-btn comment-upvote-btn">
                                <i class="fa fa-arrow-up text-primary">
                                    <span style="margin-left: 3px;" class = "comment-upvote-text">${ comment.upvote_count }</span>
                                    <span class = "comment-id" style = "display: none;">${ comment.id }</span>
                                </i>
                            </a>
                            <a class="vote-btn comment-downvote-btn">
                                <i class="fa fa-arrow-down text-danger">
                                    <span style="margin-left: 3px;" class = "comment-downvote-text">${ comment.downvote_count }</span>
                                    <span class = "comment-id" style = "display: none;">${ comment.id }</span>
                                </i>
                            </a>
                        </div> 
                    </div>
                </div>
            </div>
        `;
    });
    comment_container.innerHTML = comment_contents;

    let upvote_btns = document.getElementsByClassName("comment-upvote-btn");
    Array.from(upvote_btns).forEach(btn => {
        btn.addEventListener("click", (e) => {
            let upvote_text = e.target.querySelector(".comment-upvote-text");
            let commentId = e.target.querySelector(".comment-id").textContent;
            console.log(upvote_text.textContent, commentId);
            axios.get("../php/update-comment-vote.php?commentid=" + commentId + "&votetype=upvote_count")
                .then(res => {
                    if(res.data == 200) {
                        upvote_text.innerHTML = Number(upvote_text.textContent) + 1;
                    }
                });
        });
    });

    let downvote_btns = document.getElementsByClassName("comment-downvote-btn");
    Array.from(downvote_btns).forEach(btn => {
        btn.addEventListener("click", (e) => {
            let downvote_text = e.target.querySelector(".comment-downvote-text");
            let commentId = e.target.querySelector(".comment-id").textContent;
            console.log(downvote_text.textContent, commentId);
            axios.get("../php/update-comment-vote.php?commentid=" + commentId + "&votetype=downvote_count")
                .then(res => {
                    if(res.data == 200) {
                        downvote_text.innerHTML = Number(downvote_text.textContent) + 1;
                    }
                });
        });
    });
});