<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <?php
        $isLoggedIn = false;
    ?>
    <script> if(localStorage.getItem("user")) <?php $isLoggedIn = true; ?> console.log("logged in") </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./bootstrap-4.3.1-dist/css/bootstrap.css">
    <link rel="stylesheet" href="./css/home-styles.css">

    <title>Home</title>
</head>
<body>
    
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
        <div class="container">
            <a class="navbar-brand" href="#">NITTE forum</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="./home.php">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <?php 
                        if($isLoggedIn) { ?>
                            <li class="nav-item">
                                <a class="nav-link" href="/account.html">Account</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/post.html">New Post</a>
                            </li>
                    <?php } ?>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Education</a>
                            <a class="dropdown-item" href="#">Sports</a>
                            <a class="dropdown-item" href="#">Politics</a>
                            <a class="dropdown-item" href="#">Games</a>
                            <a class="dropdown-item" href="#">Books</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                Create New
                                <i class="fa fa-plus new-item-icon" aria-hidden="true"></i>
                            </a>
                        </div>
                    </li>  
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-3" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </form>
                <?php 
                    if(!$isLoggedIn) { ?>
                        <a href="./login.html" class="btn btn-primary login-btn" onclick="login.html">
                            Log in
                        </a>
                        <a href="./signup.html" class="btn btn-outline-primary signup-btn" onclick="signup.html">
                            Sign Up
                        </a>
                <?php } else { ?>
                    <a href="./home.php" id = "logout-btn" class="btn btn-primary logout-btn" style = "margin-left: 50px; margin-right: 0;">
                        Log out
                    </a>
                <?php } ?>
            </div>
        </div>
    </nav>
    <!-- navbar end -->

    <!-- posts section -->
    <div class="container">
        <h1 class="center">Posts</h1>
        <!-- all posts -->
        <section class="row justify-content-md-center ">
            <div class="col-md-8 shadow p-3 mb-5 bg-white rounded">
                <h3>Title</h3>
                <p>Description</p>
                <div class = "row">
                    <div class="col-md-1">
                        <button class="btn">
                            <i class="fa fa-arrow-up text-primary"><span>100</span></i>
                        </button>
                    </div>
                    <div class="col-md-1">
                        <button class="btn">
                            <i class="fa fa-arrow-down text-danger"><span>50</span></i>
                        </button>
                    </div>
                    <div class="col-md-10">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-11">
                                    <input type="text" class="form-control" placeholder="Comment">
                                </div>
                                <button class="btn btn-outline-primary">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-md-8 shadow p-3 mb-5 bg-white rounded">
                <h3>Title</h3>
                <p>Description</p>
                <div class = "row">
                    <div class="col-md-1">
                        <button class="btn">
                            <i class="fa fa-arrow-up text-primary"><span>100</span></i>
                        </button>
                    </div>
                    <div class="col-md-1">
                        <button class="btn">
                            <i class="fa fa-arrow-down text-danger"><span>50</span></i>
                        </button>
                    </div>
                    <div class="col-md-10">
                        <form>
                            <div class="form-group row">
                                <div class="col-sm-11">
                                    <input type="text" class="form-control" placeholder="Comment">
                                </div>
                                <button class="btn btn-outline-primary">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script src = "./js/jquery.js" ></script>
    <script src="./js/popper.js" ></script>
    <script src="./bootstrap-4.3.1-dist/js/bootstrap.js" ></script>

    <script>
        document.querySelector("#logout-btn").addEventListener("click", (e) => {
            localStorage.removeItem("user");
        });
    </script>

</body>
</html>