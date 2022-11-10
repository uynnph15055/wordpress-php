        <?php
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => 10,
    );
      
    $products = wc_get_products($args);
    foreach( $products  as  $product):
     ?>
        <div class="product-item">
            <div class="product-item_img-box">
                <a href="<?=$product->get_permalink();?>"><?= $product->get_image()?></a>
                <div class="product-item_percent">
                    <div class="product-item_percent--title">
                        SALE
                    </div>
                    <div class="product-item_percent--data">
                        <?=ceil(((int)$product->get_regular_price() - (int)$product->get_sale_price()) * 100/(int)$product->get_regular_price())?>%
                    </div>
                </div>
                <a href="<?=$product->get_permalink();?>" class="product-item_icon">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </a>
            </div>
            <style>
            .product-item_info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .product-item_img-box img {
                width: 100%;
            }
            </style>
            <div class="product-item_info">
                <div class="product-item_name"><a href="<?=$product->get_permalink();?>"><?=$product->get_title()?></a></div>
                <div class="product-item_price-wraper">
                    <div class="product-price-main">
                        <?=  number_format($product->get_regular_price() , 0 , ',' , ',');   ?>đ
                    </div>
                    <div class="product-price_sale">
                        <?=  number_format($product->get_regular_price() , 0 , ',' , ',');    ?>₫
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>