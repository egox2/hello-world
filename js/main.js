(function(){

    $(document).ready(function() {

        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });


        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = $('.home-section'),
            slideSection = $('.slide-section'),
            systemSection = $('.system-section'),
            navbar      = $('.navbar-custom'),
            navHeight   = navbar.height(),
            worksgrid   = $('#works-grid'),
            width       = Math.max($(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        buildSlideSection(slideSection);
        buildSystemSection(systemSection);
        navbarAnimation(navbar, homeSection, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        $(window).resize(function() {
            var width = Math.max($(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            buildSlideSection(slideSection);
            buildSystemSection(systemSection);
            hoverDropdown(width, mobileTest);
        });

        $(window).scroll(function() {
            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

        var module = $('.home-section, .system-section, .module, .module-small, .side-image');
        module.each(function(i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height($(window).height());
                } else {
                    homeSection.height($(window).height() * 0.60);
                }
            }
        }
        function buildSlideSection(slideSection) {
            if ($(window).height() < 767) {
                slideSection.height($(window).height());
            } else{
                slideSection.height($(window).height() * 0.70);
            }

        }
        function buildSystemSection(systemSection) {
            if ($(window).height() < 767) {
                systemSection.height('auto');
            } 
            if (systemSection.hasClass('wait-section')){
                systemSection.height('auto');  
            }
            else{
                systemSection.css('min-height', $(window).height());
            }

        }

        /* ---------------------------------------------- /*
         * footer toggle
         /* ---------------------------------------------- */
        $(document).ready(function(){
            FooterSlider();
        });

        // mobile footer
        function FooterSlider(){

            // 舊的
            if($(window).width() >= 992){
                $('.ts-footer__sitemap__title').unbind('click');
                $('.ts-footer__sitemap__title').next().show();
            }
            else {
                $('.ts-footer__sitemap__title').unbind().click(function(){
                    $(this).next().slideToggle(200);
                });
            }

            // 新的
            if($(window).width() >= 992){
                $('.ts-footer-new__sitemap__title').unbind('click');
                $('.ts-footer-new__sitemap__title').next().show();
                $('.ts-footer-new__sitemap__title').attr('data-click',false);
            }
            else{
                if(!$('.ts-footer-new__sitemap__title').attr('data-click') || $('.ts-footer-new__sitemap__title').attr('data-click')  == 'false'){
                    $('.ts-footer-new__sitemap__title').attr('data-click',true);
                    $('.ts-footer-new__sitemap__title').click(function(){
                        $(this).next().slideToggle(200);
                        $(this).parent().siblings('.col-xs-6').find('.ts-footer-new__sitemap__title').next().slideToggle(200);
                    });
                }
            }
        }

        // slider



        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = $(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = $('.caption-content');
                    caption.css('opacity', (1 - topScroll/homeSection.height() * 1));
                }
            }
        }




        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 ) {
                if(topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

        function navbarSubmenu(width) {
            if (width > 767) {
                $('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
                    var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
                    var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        $(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        $(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if ($('.dropdown', $(this)).length > 0) {
                        var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            $(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            $(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest !== true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
                        var $this = $(this);
                        setTimeoutConst = setTimeout(function() {
                            $this.addClass('open');
                            $this.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        $(this).removeClass('open');
                        $(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });


        /* ---------------------------------------------- /*
         * Video popup, Gallery
         /* ---------------------------------------------- */

        $('.video-pop-up').magnificPopup({
            type: 'iframe'
        });
        $('.img-pop-up').magnificPopup({
            type: 'image'
        });
        $('.popup-modal').magnificPopup({
            type: 'inline',
            fixedContentPos: true,
            alignTop: true,
            closeBtnInside: true
        });

        $(".gallery-item").magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.'
            }
        });



        /* ---------------------------------------------- /*
         * footer toggle
         /* ---------------------------------------------- */
        $(document).ready(function(){
            FooterSlider();
        });

        // mobile footer
        function FooterSlider(){

            // 舊的
            if($(window).width() >= 992){
                $('.ts-footer__sitemap__title').unbind('click');
                $('.ts-footer__sitemap__title').next().show();
            }
            else {
                $('.ts-footer__sitemap__title').unbind().click(function(){
                    $(this).next().slideToggle(200);
                });
            }

            // 新的
            if($(window).width() >= 992){
                $('.ts-footer-new__sitemap__title').unbind('click');
                $('.ts-footer-new__sitemap__title').next().show();
                $('.ts-footer-new__sitemap__title').attr('data-click',false);
            }
            else{
                if(!$('.ts-footer-new__sitemap__title').attr('data-click') || $('.ts-footer-new__sitemap__title').attr('data-click')  == 'false'){
                    $('.ts-footer-new__sitemap__title').attr('data-click',true);
                    $('.ts-footer-new__sitemap__title').click(function(){
                        $(this).next().slideToggle(200);
                        $(this).parent().siblings('.col-xs-6').find('.ts-footer-new__sitemap__title').next().slideToggle(200);
                    });
                }
            }
        }

        // slider




        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });



    });
})(jQuery);




