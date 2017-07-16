$(document).ready(function(){
    $('.slick-carousel').slick({
        vertical: true,
        verticalSwiping: true,
        dots: true,
        arrows: false,
        appendDots: $('#dots'),
    });

    $('.toggler').click(function(){
        $(this).toggleClass('open');
    });
});
