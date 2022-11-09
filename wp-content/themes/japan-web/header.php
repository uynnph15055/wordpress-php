<!DOCTYPE html>
<html lang="en">

<head>
    <meta harset="<?php bloginfo( 'charset'); ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="reset.css" />
    <link rel="stylesheet" href="<?php bloginfo('template_directory')?>/css/style.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

</script>
    <?php wp_head(); ?>
</head>

<body>
    <div class="wrapper">
        <div class="header container d-flex align-items-center bd-highlight">
            <a class="flex-fill bd-highlight" href=""><img class="header--logo"
                    src="<?php bloginfo('template_directory')?>/asset/omron logo.png" alt="" /></a>
            <?php wp_nav_menu(array(
            'theme_location' => 'header_menu',
            'container' => 'false',
            'menu_id' => 'header_menu',
            'menu_class' => 'header__menu d-flex justify-content-center flex-fill bd-highlight'
            )); ?>
      
            <div class="header__btn d-sm-none d-md-block d-mx-block d-lg-block flex-fill bd-highlight">
                <a href="" class="btn__common btn__login text-decoration-none">お問い合わせ</a>
                <a href="" class="btn__common btn__register text-decoration-none">資料ダウンロード</a>
            </div>
        </div>