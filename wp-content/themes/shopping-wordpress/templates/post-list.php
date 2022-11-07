<?php

/*
 Template Name: Post List
 */
get_header();
?>
<div class="main padding-container">
    <div class="post__list">
        <?php  foreach(get_post_asc() as $post) : ?>
        <div class="post__item">
            <div class="post__item-image--box">
                <a href=""><img src="<?=get_the_post_thumbnail_url(get_the_ID(),'medium');?>" alt=""
                        class="post__item-image" /></a>
            </div>
            <div class="post__item--info">
                <h3 class="post__item--title">
                    <a href=""> <?= the_title()?> </a>
                </h3>
                <p class="post__item--intro text-collapse-row-2">
                    <?=  the_excerpt(); ?>
                </p>
            </div>
        </div>
        <?php endforeach; ?>

        <?php if(paginate_links()!='') {?>
        <div class="post__paginate">
            <?php
                    global $wp_query;
                    $big = 999999999;
                    echo paginate_links( array(
                        'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
                        'format' => '?paged=%#%',
                        'prev_text'    => __('« Mới hơn'),
                        'next_text'    => __('Tiếp theo »'),
                        'current' => max( 1, get_query_var('paged') ),
                        'total' => $wp_query->max_num_pages
                        ) );
                    ?>
        </div>
        <?php } ?>
    </div>
    <?php get_sidebar();  ?>
</div>
<?php get_footer();  ?>