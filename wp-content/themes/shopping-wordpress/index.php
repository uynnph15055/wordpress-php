<?php  get_header(); ?>

<div class="banner">
    <img class="w-100" src="https://theme.hstatic.net/1000409762/1000752712/14/slideshow_2.jpg?v=10" alt="">
    <div class="banner-sub_box  padding-container">
        <?php 
            $args = array(
                'posts_per_page' => 3,
                'post_type'      => 'slider',
            );
            $the_query = new WP_Query( $args );
            ?>
        <?php if( $the_query->have_posts() ): ?>
        <?php while( $the_query->have_posts() ) : $the_query->the_post(); ?>
        <div class="banner-sub_img-box">
            <img class="w-100 h-100"
                src="<?=get_the_post_thumbnail_url(get_the_ID(),'full' , array('class' => 'w-100 h-100'));?>"
                alt="">
        </div>
        <?php endwhile; ?>
        <?php endif; ?>
        <?php wp_reset_query(); ?>
    </div>
</div>
<div class="content-home">
    <h3 class="header-footer-title commom-title text-center">
        Sản phẩm mới nhất
    </h3>
    <p class="text-center color-text">Cập nhật những sản phẩm mới nhật</p>
    <div class="product-list_box padding-container">
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

    <div class="category_image-box padding-container">
        <div class="category_image-above-box ">
            <div class="category_image-above-left">
                <div class="category_image-item-box">
                    <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_banner_center_1.jpg?v=10"
                        alt="Avatar" class="image">
                    <div class="overlay">
                        <div class="text">Sản phẩm mới nhất</div>
                    </div>
                </div>
                <div class="category_image-item-box" style="margin-top: 25px">
                    <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_banner_center_2.jpg?v=10"
                        alt="Avatar" class="image">
                    <div class="overlay">
                        <div class="text">Sản phẩm mới nhất</div>
                    </div>
                </div>
            </div>
            <div class="category_image-above-right">
                <div class="category_image-item-box">
                    <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_banner_center_3.jpg?v=10"
                        alt="Avatar" class="image">
                    <div class="overlay">
                        <div class="text">Hello World</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="category_image-down-box">
            <div class="category_image-item-box">
                <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_collection_info_1.jpg?v=10"
                    alt="Avatar" class="image">
                <div class="overlay">
                    <div class="text">Sản phẩm mới nhất</div>
                </div>
            </div>
            <div class="category_image-item-box">
                <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_collection_info_2.jpg?v=10"
                    alt="Avatar" class="image">
                <div class="overlay">
                    <div class="text">Sản phẩm mới nhất</div>
                </div>
            </div>
            <div class="category_image-item-box">
                <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_collection_info_4.jpg?v=10"
                    alt="Avatar" class="image">
                <div class="overlay">
                    <div class="text">Sản phẩm mới nhất</div>
                </div>
            </div>
            <div class="category_image-item-box">
                <img src="https://theme.hstatic.net/1000409762/1000752712/14/img_collection_info_3.jpg?v=10"
                    alt="Avatar" class="image">
                <div class="overlay">
                    <div class="text">Sản phẩm mới nhất</div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php  get_footer();  ?>