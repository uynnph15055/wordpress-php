<?php

function register_menu(){
    register_nav_menu('header_menu' , __('Menu-chính'));
}

add_action('init' ,'register_menu');

if (!function_exists('dd')) {
    function dd()
    {
        echo '<pre>';
        array_map(function($x) {var_dump($x);}, func_get_args());
        echo '</pre>';
        die;
    }
}