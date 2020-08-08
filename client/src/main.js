import $ from 'jquery';

$(document).ready(function () {

    $('.provider-nav .categories ul li').click(function () {

        var type = $(this).data('type');
        $(type).show().siblings().hide();
        console.log(type)

    });

});