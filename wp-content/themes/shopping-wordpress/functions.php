<?php


function initTheme(){
    // Hàm thay đổi theme editor về phiên bản cũ
    add_filter('use_block_editor_for_post' , '__return_false');

    // Hàm đăng ký menu wordpress
    register_nav_menu('header_menu' , __('shopping-menu'));
}
add_action('init' ,'initTheme');


// Hàm dể check dữ liệu 
if (!function_exists('dd')) {
    function dd()
    {
        echo '<pre>';
        array_map(function($x) {var_dump($x);}, func_get_args());
        echo '</pre>';
        die;
    }
}

// Gọi danh sách các bài post tăng dần
function get_post_asc(){
    $args = array(
        'post_type' => 'post',
        'orderby'   => 'ID',
        'order' => 'ASC',
    );
    return get_posts($args);
}


// Gọi danh sách các bài post tăng dần
function get_post_desc(){
    $args = array(
        'post_type' => 'post',
        'orderby'   => 'ID',
        'order' => 'DESC',
    );
    return get_posts($args);
}


// Gọi danh dách danh mục bài viết
function get_category_list(){
    $args = array(
        'post_type' => 'post',
        'number'    => 10,
    );
    return get_categories($args);
}
