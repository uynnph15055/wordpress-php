<div class="product-list_box padding-container">
    <?php
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => 10,
    );
      
    
    foreach(get_posts($args) as  $product):
     ?>
    <div class="product-item">
        <div class="product-item_img-box">
            <img class="w-100" src="<?=get_the_post_thumbnail_url(get_the_ID(),'medium');?>" alt="">
            <div class="product-item_percent">
                <div class="product-item_percent--title">
                    SALE
                </div>
                <div class="product-item_percent--data">
                    <?=ceil((get_post_meta( get_the_ID(), '_regular_price', true) - trim(get_post_meta( get_the_ID(), '_sale_price', true))) * 100/get_post_meta( get_the_ID(), '_regular_price', true)); ?>%
                </div>
            </div>
            <div class="product-item_icon">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
            </div>
        </div>
        <style>
            .product-item_info{
                display: flex;
                flex-direction: column;
                justify-content:space-between;
            }
        </style>
        <div class="product-item_info">
            <div class="product-item_name"><a href="<?=get_permalink(get_id())?>"><?= get_the_title() ?></a></div>
            <div class="product-item_price-wraper">
                <div class="product-price-main">
                    <?=  number_format(get_post_meta( get_the_ID(), '_regular_price', true) ,0,",",".");   ?>đ
                </div>
                <div class="product-price_sale">
                    <?=  number_format(get_post_meta( get_the_ID(), '_sale_price', true) ,0,",",".");   ?>₫
                </div>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>