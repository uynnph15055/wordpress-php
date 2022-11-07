<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<?php bloginfo('template_directory')?>/assets/css/base.css">
    <link rel="stylesheet" href="<?php bloginfo('template_directory')?>/assets/css/Home.css">
    <link rel="stylesheet" href="<?php bloginfo('template_directory')?>/assets/css/contact.css">
    <link rel="stylesheet" href="<?php bloginfo('template_directory')?>/assets/css/post.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v14.0"
        nonce="vWDw95v7"></script>
    <?php wp_head(); ?>
</head>

<body>
    <div id="fb-root"></div>
    <div class="container">
        <header class="header">
            <div class="header-top">
                <p>Trang mua hàng nội thất trực tuyến chính hãng!</p>
            </div>
            <div class="header-main padding-container">
                <div class="header-main_log">
                    <span>Urban Home</span>
                </div>
                <form action="" class="header-search_form-box">
                    <input class="header-search_form-input" type="text" placeholder="Tìm kiếm sản phẩm">
                    <button class="header-search_btn-primary"><i class="fa-solid fa-magnifying-glass"></i></button>

                </form>
                <div class="header-phone header-main_sub">
                    <p><i class="fa-solid icon fa-square-phone"></i></p>
                    <div class="">
                        <span>Hotline:</span>
                        <br>
                        <p>1900.636.099
                        </p>
                    </div>
                </div>
                <div class="header-login  header-main_sub">
                    <p><i class="fa-solid icon fa-user"></i></p>
                    <div class="">
                        <span>Đăng nhập/Đăng ký</span>
                        <br>
                        <p>Tài khoản của tôi <i class="fa-solid fa-caret-down"></i>
                        </p>
                    </div>
                </div>
                <div class="header-cart header-main_sub">
                    <div class="header-icon-cart">
                        <p><i class="fa-solid icon fa-cart-shopping"></i></p>
                        <span>0</span>
                    </div>
                    <div class="">
                        <p>Giỏ hàng
                        </p>
                    </div>
                </div>
            </div>
            <div class="header-menu padding-container">
                <?php wp_nav_menu( 
                        array( 
                            'theme_location' => 'header_menu', 
                            'container' => 'false', 
                            'menu_id' => 'header_menu', 
                            'menu_class' => 'header-menu_list'
                        ) 
                    ); ?>

            </div>