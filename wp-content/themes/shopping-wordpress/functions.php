<?php

function initTheme(){
    // Add css 
    wp_enqueue_style( 'base-style', get_template_directory_uri() . '/assets/css/base.css' );
    wp_enqueue_style( 'home-style', get_template_directory_uri() . '/assets/css/Home.css' );
    wp_enqueue_style( 'post-style', get_template_directory_uri() . '/assets/css/post.css' );
    wp_enqueue_style( 'product-style', get_template_directory_uri() . '/assets/css/Product.css' );
    wp_enqueue_style( 'product-detail-style', get_template_directory_uri() . '/assets/css/Product-detail.css' );

    // Add javascript
    wp_enqueue_script( 'jquery-script', 'https://code.jquery.com/jquery-3.6.0.js' );
    wp_enqueue_script( 'back-top-script', get_template_directory_uri() . '/assets/js/back-top.js' );
    wp_enqueue_script( 'tab-script', get_template_directory_uri() . '/assets/js/tab.js' );
    wp_enqueue_script( 'tab-slider-script', get_template_directory_uri() . '/assets/js/tab-slider.js' );

    // Hàm thay đổi theme editor về phiên bản cũ
    add_filter('use_block_editor_for_post' , '__return_false');

    // Hàm đăng ký menu wordpress
    register_nav_menu('header_menu' , __('shopping-menu'));

    // Custom slider
    $label = array(
        'name' => 'Ảnh slider', //Tên post type dạng số nhiều
        'singular_name' => 'anh-slider' //Tên post type dạng số ít
    );
 
    //  
    $args = array(
        'labels' => $label, //Gọi các label trong biến $label ở trên
        'description' => 'Ảnh slider', //Mô tả của post type
        'supports' => array(
            'title',
            'thumbnail',
        ), //Các tính năng được hỗ trợ trong post type
        'taxonomies' => array( 'category', 'post_tag' ), //Các taxonomy được phép sử dụng để phân loại nội dung
        'hierarchical' => false, //Cho phép phân cấp, nếu là false thì post type này giống như Post, true thì giống như Page
        'public' => true, //Kích hoạt post type
        'show_ui' => true, //Hiển thị khung quản trị như Post/Page
        'show_in_menu' => true, //Hiển thị trên Admin Menu (tay trái)
        'show_in_nav_menus' => true, //Hiển thị trong Appearance -> Menus
        'show_in_admin_bar' => true, //Hiển thị trên thanh Admin bar màu đen.
        'menu_position' => 5, //Thứ tự vị trí hiển thị trong menu (tay trái)
        'menu_icon' => 'dashicons-format-gallery', //Đường dẫn tới icon sẽ hiển thị
        'can_export' => true, //Có thể export nội dung bằng Tools -> Export
        'has_archive' => true, //Cho phép lưu trữ (month, date, year)
        'exclude_from_search' => false, //Loại bỏ khỏi kết quả tìm kiếm
        'publicly_queryable' => true, //Hiển thị các tham số trong query, phải đặt true
        'capability_type' => 'post' //
    );
 
    register_post_type('slider', $args);
}
add_action('init' ,'initTheme');

function get_short_description( $context = 'view' ) {
    return $this->get_prop( 'short_description', $context );
}

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