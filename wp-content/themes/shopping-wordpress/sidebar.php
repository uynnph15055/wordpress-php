<div class="aside__list">
    <h3>Danh mục bài viết</h3>
     <ul class="post__category--list">
        <?php foreach(get_category_list() as $category): ?>
        <li class="post__category--item">
             <a href=""><i class="fa-solid fa-caret-right"></i>&nbsp;&nbsp; <?=$category->name?></a>
        </li>
        <?php endforeach; ?>
     </ul>
    <h3 class="post__relate--title">Bài viết liên quan</h3>
    <div class="post__relate--list">
        <?php foreach(get_post_desc() as $post): ?>
        <div class="post__relate--item">
            <a href="" class="w-100"><img class="w-100"
                    src="<?=get_the_post_thumbnail_url(get_the_ID());?>"
                    alt=""></a>
            <div class="post__relate--item-info ">
                <p class="text-collapse-row-2"><?= the_title(); ?></p>
            </div>
        </div>
        <?php endforeach; ?>
    </div>

</div>