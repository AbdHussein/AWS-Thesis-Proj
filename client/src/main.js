import $ from 'jquery';

<<<<<<< HEAD
function waterMelon() {
  // $(document).ready(function () {
  $('.provider-nav .categories ul li').click(function () {
    var type = $(this).data('type');
    $(this).addClass('active').siblings().removeClass('active');
    $(type).show().siblings().hide();
    console.log(type);
  });

  $('.gallery-img').hover(function () {
    $(this).children('.img-overlay').toggle(500);
  });

  $('.gallery > div .img-overlay').click(function () {
    $(this).parent().siblings().show();
    $('.img-popup').css({
      position: 'fixed',
    });
  });
  $('.img-popup svg').click(function () {
    $('.img-popup').hide();
  });

  // });
}

export default waterMelon;
=======
$(document).ready(function () {

    $('.provider-nav .categories ul li').click(function () {

        var type = $(this).data('type');
        $(this).addClass('active').siblings().removeClass('active');
        $(type).show().siblings().hide();
        console.log(type)

    });

    $('.gallery-img').hover(function () {
        $(this).children('.img-overlay').toggle(500);
    });

    $('.gallery > div .img-overlay').click(function () {
        $(this).parent().siblings().show();
        $('.img-popup').css({
            position: 'fixed',
        })
    });
    $('.img-popup svg').click(function () {
        $('.img-popup').hide();
    });

});
>>>>>>> cf81a2239d045a54635c36b426013b675583474f
