<?php

/*
 Template Name: Page product
 */

get_header();
while (have_posts()) : the_post();
$product =  wc_get_product();
?>
<div class="banner">
    <img class="w-100" src="https://theme.hstatic.net/1000409762/1000752712/14/collection_banner.jpg?v=10" alt="">
</div>

<div class="content padding-container">
    <header class="header-product-box">
        <div class="icon-open-filer-all" style="cursor: pointer;" onclick="openNav()">
            <i class="fa-solid fa-arrow-down-short-wide"></i>
            Filter
        </div>
        <div class="title-box text-center">
            <h3 class="commom-title">Tất cả sản phẩm</h3>
        </div>
        <div class="selected-box">
            <select class="select" name="" id="">
                <option value="">Mới nhất</option>
                <option value="">Gần đây</option>
                <option value="">Bán chạy nhất</option>
            </select>
        </div>
    </header>
    <div class="product-box">
        <div class="overlay-content">
            <button class="accordion">Loai hinh sản phẩm</button>
            <div class="panel-product">
                <ul>
                    <li><a href=""><i class="fa-solid fa-caret-right"></i> Tất cả sản phẩm</a></li>
                    <li><a href=""><i class="fa-solid fa-caret-right"></i> Sản phẩm khuyến mãi</a></li>
                    <li><a href=""><i class="fa-solid fa-caret-right"></i> Sản phẩm nổi bật</a></li>
                </ul>
            </div>

            <button class="accordion">Loại sản phẩm</button>
            <div class="panel-product">
                <?php dd($product->get_categories()) ?>
                <ul>
                    <li><a href=""><i class="fa-solid fa-registered"></i>  </a></li>
                </ul>
            </div>

            <button class="accordion">GIÁ SẢN PHẨM</button>
            <div class="panel-product">
                <ul>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> Dưới 500,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> 500,000₫ - 1,000,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> 1,000,000₫ - 1,500,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> 2,000,000₫ - 5,000,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> Trên 5,000,000₫</a></li>
                </ul>
            </div>
            <button class="accordion">MÀU SẮC</button>
            <div class="panel-product">
                <ul class="filter-list-color">
                    <li><a class="color-blue" href=""></a></li>
                    <li><a class="color-red" href=""></a></li>
                    <li><a class="color-pink" href=""></a></li>
                    <li><a class="color-gray" href=""></a></li>
                    <li><a class="color-orange" href=""></a></li>
                </ul>
            </div>
        </div>
        <div class="page-product_box">
            <?=get_template_part( 'template-parts/product-list')?>
        </div>
    </div>

</div>
<?php
endwhile; 
get_footer(); ?>