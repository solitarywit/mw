function initScripts() {
    $('.slick-carousel').slick({
        vertical: true,
        verticalSwiping: true,
        dots: true,
        arrows: false,
        appendDots: $('#dots'),
        autoplay: true,
        autoplaySpeed: 3000,
    });

    AOS.refresh();
}

function destroyScripts() {
    $('.slick-carousel').slick('unslick');
}
function getCurrentPageName() {
    var newPageArray = location.pathname.split('/');
    return newPageArray[newPageArray.length - 1];
}

function getBodyClass(url) {
    return 'cd-' + url.replace('.html', '');
}

var TRANSITIONS = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
var $MAIN_CONTAINER = $('main');
var DELAY = 500;
var $BODY = $('body');
var CHANGING_PAGE_CLASS = 'page-is-changing';
var $LINK = $('[data-type="page-transition"]');

$(document).ready(function () {
    $('.toggler, .overlay').click(function(){
        $('.toggler').toggleClass('open');
        $('.page').toggleClass('open');
    });
    AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
    });

    initScripts();

    var firstLoad = false;

    $BODY.addClass(getBodyClass(getCurrentPageName()));

    //trigger smooth transition from the actual page to the new one
    $LINK.on('click', function (event) {
        event.preventDefault();
        //if the page is not already being animated - trigger animation
        changePage($(this).attr('href'), true);
        firstLoad = true;
    });

    //detect the 'popstate' event - e.g. user clicking the back button
    $(window).on('popstate', function () {
        if (firstLoad) {
            var newPage = getCurrentPageName();
            changePage(newPage, false);
        }
        firstLoad = true;
    });

    function changePage(url, bool) {

        // trigger page animation
        $BODY.addClass(CHANGING_PAGE_CLASS);
        $('.cd-loading-bar').one(TRANSITIONS, function () {
            loadNewContent(url, bool);
            $('.cd-loading-bar').off(TRANSITIONS);
        });
    }

    function loadNewContent(url, bool) {
        url = (!url) ? 'index.html' : url;
        var newSection = getBodyClass(url),
            section = $('<div class="cd-main-content ' + newSection + '"></div>');

        section.load(url + ' .cd-main-content > *', function () {
            setTimeout(function () {
                $BODY.removeClass().addClass(newSection);
                $('.cd-loading-bar').one(TRANSITIONS, function () {
                    $('.cd-loading-bar').off(TRANSITIONS);
                });

                destroyScripts();
                $MAIN_CONTAINER.html(section);
                initScripts();

            }, DELAY);

            if (url !== window.location && bool) {
                window.history.pushState({path: url}, '', url);
            }
        });
    }
});