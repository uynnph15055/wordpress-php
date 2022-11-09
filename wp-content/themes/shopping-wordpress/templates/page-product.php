<?php

/*
 Template Name: Page product
 */
get_header();
?>
<div class="banner">
    <img class="w-100" src="https://theme.hstatic.net/1000409762/1000752712/14/collection_banner.jpg?v=10" alt="">
</div>

<div class="content padding-container">
    <style>
    .header-product-box {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        align-items: center;
    }
    </style>
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
    <div id="myNav" class="overlay">

        <!-- Button to close the overlay navigation -->
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

        <!-- Overlay content -->
        <div class="overlay-content">
            <button class="accordion">Loai hinh sản phẩm</button>
            <div class="panel">
                <ul>
                    <li><a href=""><i class="fa-solid fa-caret-right"></i> Tất cả sản phẩm</a></li>
                    <li><a href=""><i class="fa-solid fa-caret-right"></i> Sản phẩm khuyến mãi</a></li>
                    <li><a href=""><i class="fa-solid fa-caret-right"></i> Sản phẩm nổi bật</a></li>
                </ul>
            </div>

            <button class="accordion">Thương hiệu</button>
            <div class="panel">
                <ul>
                    <li><a href=""><i class="fa-solid fa-registered"></i> Tất cả sản phẩm</a></li>
                    <li><a href=""><i class="fa-solid fa-registered"></i> Sản phẩm khuyến mãi</a></li>
                    <li><a href=""><i class="fa-solid fa-registered"></i> Sản phẩm nổi bật</a></li>
                </ul>
            </div>

            <button class="accordion">GIÁ SẢN PHẨM</button>
            <div class="panel">
                <ul>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> Dưới 500,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> 500,000₫ - 1,000,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> 1,000,000₫ - 1,500,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> 2,000,000₫ - 5,000,000₫</a></li>
                    <li><a href=""><i class="fa-solid fa-dollar-sign"></i> Trên 5,000,000₫</a></li>
                </ul>
            </div>
            <button class="accordion">MÀU SẮC</button>
            <div class="panel">
                <ul class="filter-list-color">
                    <li><a class="color-blue" href=""></a></li>
                    <li><a class="color-red" href=""></a></li>
                    <li><a class="color-pink" href=""></a></li>
                    <li><a class="color-gray" href=""></a></li>
                    <li><a class="color-orange" href=""></a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="product-list_box ">
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>
        <div class="product-item">
            <div class="product-item_img-box">
                <img class="w-100"
                    src="https://product.hstatic.net/1000409762/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_large.jpg"
                    alt="">
                <div class="product-item_percent">25%</div>
                <div class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>
            <p class="product-item_name"><a href="">Ấm trà inox không ghỉ</a></p>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    890,000₫
                </div>
                <div class="product-price_sale">
                    1,250,000₫
                </div>
            </div>
        </div>


    </div>

</div>
<?php get_footer(); ?>