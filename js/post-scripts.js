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
    
    if(user) {
        let forumId = idQuery.split("=")[1];
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
                        <span class = "comment-id" style = "display: none;">${ comment.id }</span>
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
                    </div>
                </div>
            </div>
        `;
    });
    comment_container.innerHTML = comment_contents;
});