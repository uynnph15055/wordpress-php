<?php  
get_header();
while (have_posts()) : the_post()
?>
<style>
    .box p{
        font-size: 17px;
        line-height: 1.6;
        text-align: justify;
    }

    .box img{
        width: 100%;
        margin: 20px 0px
    }
</style>
<div class="main post__detail padding-container">
    <div class="box" style="padding-right:100px">
        <ul class="breadcrumb">
            <li><a class="breadcrumb__normal" href="#">Trang chủ</a></li>
            <li><a  class="breadcrumb__normal"  href="#">Tin tức</a></li>
            <li ><a href="#" class="breadcrumb__current"><?= the_title(); ?></a></li>
        </ul>
        <h1 style="margin: 15px 0px;"  class="post__title"><?= the_title(); ?></h1>
        <p  style="margin-bottom: 20px">Ngày đăng: <?php the_date('d/m/Y');?></p>
        <?= the_content(); ?>
    </div>
    <?php get_sidebar();  ?>
</div>
<?php
endwhile;
 get_footer();    ?>