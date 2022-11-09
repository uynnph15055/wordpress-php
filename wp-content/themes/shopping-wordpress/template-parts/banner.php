<div class="banner">
    <div class="container">
        <button class="container__btn-commom container__btn-prev">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <?php
           $argsByCate = array(
            'posts_per_page'   => -1,
            'category'         => 25,
            'order'            => 'ASC',
            'post_type'        => 'slider'
          );
           ?>
        <div class="container__image--box">
            <?php
            $index =0; 
            foreach(get_posts($argsByCate)  as $post) : $index++ ?>
            <img    src="<?=get_the_post_thumbnail_url(get_the_ID(),'full');?>" alt="" class="fade container__image 1 <?php if($index ==  1){
                echo 'active';
            } ?>" />
            <?php endforeach; ?>
        </div>
        <button class="container__btn-commom container__btn-next">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
    <div class="banner-sub_box  padding-container">
        <?php 
            $args = array(
                'posts_per_page' => 3,
                'category'         => 26,
                'order'            => 'DESC',
                'post_type'      => 'slider',
            );
            ?>
        <?php foreach(get_posts($args)  as $post) : ?>
        <div class="banner-sub_img-box">
            <img class="w-100 h-100"
                src="<?=get_the_post_thumbnail_url(get_the_ID(),'full' , array('class' => 'w-100 h-100'));?>" alt="">
        </div>
        <?php endforeach; ?>
    </div>
</div>