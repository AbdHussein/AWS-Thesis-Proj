import $ from 'jquery';

$(document).ready(function () {

    $('.provider-nav .categories ul li').click(function () {

        var type = $(this).data('type');
        $(this).addClass('active').siblings().removeClass('active');
        $(type).show().siblings().hide();
        console.log(type)

    });

});