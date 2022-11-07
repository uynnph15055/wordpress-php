<?php

/*
 Template Name: contact
 */
get_header();
?>
<div class="content-contact padding-container">
    <div class="content_map">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51974.65430294727!2d105.7366667103181!3d20.60011025942087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313433272518ce69%3A0x801ec3badbb117f5!2zSMawxqFuZyBTxqFuLCBN4bu5IMSQ4bupYywgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1658632803627!5m2!1sen!2s"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="content_form">
        <h3 class="content_form-title">Liên hệ</h3>
        <span class="color-text">Địa chỉ chúng tôi</span>
        <p class="content_form-address">Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp.
            Hồ Chí Minh.</p>
        <span class="color-text">Email chúng tôi</span>
        <p class="content_form-address">hi@haravan.com</p>
        <span class="color-text">Điện thoại</span>
        <p class="content_form-address">1900.636.099</p>
        <span class="color-text">Thời gian làm việc</span>
        <p class="content_form-address">Thứ 2 đến Thứ 6 từ 8h đến 18h; Thứ 7 và Chủ nhật từ 8h00 đến 17h00</p>
        <h3 class="content_form-title">Gửi thắc mắc cho chúng tôi</h3>
        <form action="form-contact">
                <input class="input-contact" type="text" placeholder="Họ và tên">
                <input class="input-contact" type="text" placeholder="Email">
                <input class="input-contact" type="text" placeholder="Số điện thoại">
                <input class="input-contact" type="text" placeholder="Addess">
                <textarea class="input-contact-textarea" name="" id="" placeholder="Thắc mặc của bạn" cols="30" rows="10"></textarea>
            <button class="btn-submit-contact">Gửi tin nhắn</button>
        </form>
    </div>

</div>
<?php get_footer();  ?>