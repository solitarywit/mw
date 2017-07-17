$(document).ready(function(){
    $('.slick-carousel').slick({
        vertical: true,
        verticalSwiping: true,
        dots: true,
        arrows: false,
        appendDots: $('#dots'),
        autoplay: true,
        autoplaySpeed: 3000,
    });

    $('.toggler').click(function(){
        $(this).toggleClass('open');
        $('#main-menu').toggleClass('open');
    });
});
