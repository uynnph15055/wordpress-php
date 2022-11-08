<?php  
get_header(); 
get_template_part('template-parts/banner');
 ?>
<div class="content-home">
    <h3 class="header-footer-title commom-title text-center" style="margin-top:30px">
        Sản phẩm mới nhất
    </h3>
    <p class="text-center color-text">Cập nhật những sản phẩm mới nhật</p>
     <?php get_template_part('template-parts/product-list'); ?>
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