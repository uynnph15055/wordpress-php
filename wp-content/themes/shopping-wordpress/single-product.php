<?php
get_header();

while (have_posts()) : the_post();
$product =  wc_get_product(get_the_ID());
?>
<div class="content">
    <div class="content-product-info_box">
        <div class="content-product-info_left">

            <div class="container-product-image_box">
                <img id="expandedImg" src="<?=get_the_post_thumbnail_url(get_the_ID(),'medium');?>" style="width:100%">
                <div class="content-product_info-row">
                    <div class="column">
                        <img src="https://nhaxinh.com/wp-content/uploads/2021/10/mat-ban-an-jazz-5002-300x200.jpg"
                            alt="Nature" style="width:100%" onclick="myFunction(this);">
                    </div>
                    <div class="column">
                        <img src="https://nhaxinh.com/wp-content/uploads/2021/10/nhaxinh-phong-an-may-2012105-300x200.jpg"
                            alt="Snow" style="width:100%" onclick="myFunction(this);">
                    </div>
                    <div class="column">
                        <img src="https://nhaxinh.com/wp-content/uploads/2022/08/Ban-an-oval-Cabo-1800x900x750-3-300x194.jpg"
                            alt="Mountains" style="width:100%" onclick="myFunction(this);">
                    </div>
                    <div class="column">
                        <img src="https://nhaxinh.com/wp-content/uploads/2021/10/ban-an-maxine-300x200.jpg" alt="Lights"
                            style="width:100%" onclick="myFunction(this);">
                    </div>
                </div>
            </div>
        </div>
        <div class="content-product-info_right">
            <form action="">
                <div class="header-product-info_right">
                    <h3 class="product-name"><?= the_title() ?></h3>
                    <div class="product-sale">
                        <?=ceil(((int)get_post_meta( get_the_ID(), '_regular_price', true) - (int)get_post_meta( get_the_ID(), '_sale_price', true)) * 100/(int)get_post_meta( get_the_ID(), '_regular_price', true))?>%
                    </div>
                </div>
                <div class="product-item_price-wraper">
                    <div class="product-price-main">
                        <?=number_format(get_post_meta( get_the_ID(), '_regular_price', true) , 0 , ',' , ',')?>₫
                    </div>
                    <div class="product-price_sale color-text">
                        <?=number_format(get_post_meta( get_the_ID(), '_sale_price', true) , 0 , ',' , ',')?>₫
                    </div>
                </div>
                <div class="product-atribute_box">
                    <p>Kích cỡ : </p>
                    <ul class="product-atribute_list-size">
                        <label  onClick="chooseSize()" for="size" class="size_label">To</label>
                        <input id="size" value="R" hidden name="To" type="radio">
                        <label  onClick="chooseSize()" for="size2" class="size_label">Nhỏ</label>
                        <input id="size2" value="2" hidden name="Nhỏ" type="radio">
                    </ul>
                </div>
                <script>
                function chooseSize() {
                    const size = document.querySelectorAll('.size_label');
                    size.forEach(element => {
                        element.classList.remove("sizeActive");
                        element.addEventListener('click', () => {
                            element.classList.add("sizeActive");
                        })
                    });
                }
                </script>
                <div class="product-atribute_box">
                    <p>Màu sắc : </p>
                    <ul class="product-atribute_list-color">
                        <label for="color" class="bg-black"></label>
                        <input id="color" hidden name="color" type="radio">
                        <label for="color1" class="bg-orange"></label>
                        <input id="color1" hidden name="color" type="radio">
                        <label for="color2" class="bg-red"></label>
                        <input id="color2" hidden name="color" type="radio">
                    </ul>
                </div>
                <div class="product-atribute">

                </div>
                <p class="alert-product-number">Còn <?=$product->get_stock_quantity()?> sản phẩm</p>
                <div class="">
                    <div class="number-input">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                            class="minus"><i class="fa-solid fa-minus"></i></button>
                        <input class="quantity" min="<?=$product->get_min_purchase_quantity()?>"
                            max="<?=$product->get_max_purchase_quantity()?>" name="quantity" value="1" type="number">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"><i
                                class="fa-solid fa-plus"></i></button>
                    </div>
                    <button class="btn-add-to-cart">Thêm giỏ hàng</button>
                </div>
            </form>
            <div class="tabs1">
                <div class="tab-item active tablinks" id="defaultOpen" onclick="openCity(event, 'London')">Mô tả
                </div>
                <div class="tab-item tablinks" onclick="openCity(event, 'Paris')">
                    ĐIỀU KHOẢN DỊCH VỤ</div>
                <div class="tab-item tablinks" onclick="openCity(event, 'Tokyo')">
                    CHÍNH SÁCH ĐỔI TRẢ</div>
            </div>
            <div id="London" class="tabcontent">
                <?=the_excerpt()?>
            </div>

            <div id="Paris" class="tabcontent">
                <h3>Paris</h3>
                <p>Paris is the capital of France.</p>
            </div>

            <div id="Tokyo" class="tabcontent">
                <h3>Tokyo</h3>
                <p>Tokyo is the capital of Japan.</p>
            </div>
        </div>
    </div>
    <div class="" style="margin-bottom: 20px;">
        <h3 class="commom-title product-related_title text-center">
            SẢN PHẨM LIÊN QUAN
        </h3>
        <p class="text-center color-text">Luôn sẵn sáng hỗ trợ và tư vấn cho bạn để có sản phẩm tốt nhất.</p>
    </div>
    <div class="product-list_box">
        <?=get_template_part( 'template-parts/product-list')?>
    </div>
</div>
<?php
endwhile;
get_footer();

?>
<script>
document.getElementById("defaultOpen").click();

function chooseSize() {
    const size = document.querySelectorAll('.size_label');
    size.forEach(element => {
        element.classList.remove("sizeActive");
        element.addEventListener('click', () => {
            element.classList.add("sizeActive");
        })
    });
}
</script>