/********************************************************
 *
 * Custom Javascript code for Curri Bootstrap theme
 * Written by Themelize.me (http://themelize.me)
 *
 *******************************************************/
/*global jRespond */
$(document).ready(function() {  
  "use strict";
  
  // Custom code
  // --------------------------------
  
  //IE placeholders
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() === input.attr('placeholder')) {
      if (this.originalType) {
        this.type = this.originalType;
        delete this.originalType;
      }
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() === '') {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur();  
  
  //fix main nav on scroll
  var navBarYOffset = $("#navigation").offset().top;
  $(window).scroll(function() {
    if ($(window).scrollTop() > navBarYOffset) {
      $('body').addClass('navbar-fixated');
    } else {
      $('body').removeClass('navbar-fixated');
    }
  });
  
  //Scroll Top link
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('[data-js=scroll-show]').addClass('scroll-show');
    } else {
      $('[data-js=scroll-show]').removeClass('scroll-show');
    }
  });
  
  //background & colour switch
  $('a.colour').click(function() {
    var c = $(this).data('colour');    
    $('html').toggleClass(c);
    $(this).toggleClass('on');
  });
  
  // Plugins
  // --------------------------------
  //scrollTo
  if(jQuery().onePageNav) {
    $('body').onePageNav({
      filter: 'a[href^="#"]',
      scrollOffset: 100
    });
  }
  
  //setup jPanel Menu
  if($.jPanelMenu) {
    var jPM = $.jPanelMenu({
      menu: '.mobile-toggle',
      direction: 'right',
      trigger: '.mobile-toggle-trigger',
      afterOpen: function() {
        $('.mobile-toggle-trigger').addClass('open');
        $('html').addClass('jpanel-menu-open');
        
        //refresh onePageNav
        $('body').onePageNav({
          filter: 'a[href^="#"]',
          scrollOffset: 0
        });
      },
      afterClose: function() {
        $('.mobile-toggle-trigger').removeClass('open');
        $('html').removeClass('jpanel-menu-open');
      }
    });
    
    //jRespond settings
    var jRes = jRespond([
      {
        label: 'small',
        enter: 0,
        exit: 990
      }
    ]);
    
    //turn jPanel Menu on/off as needed
    jRes.addFunc({
        breakpoint: 'small',
        enter: function() {
          jPM.on();
          
          //scrollTo
          $('body').onePageNav({
            filter: 'a[href^="#"]',
            scrollOffset: 0
          });
        },
        exit: function() {
          jPM.off();       
        }
    });
  }

  //flexslider carousels
  $('.flexslider-carousel').each(function() {
    var carouselSettings =  {
      animation: $(this).data('transition') || "slide",
      animationLoop: false,
      selector: ".items > .item",
      itemWidth: $(this).data('item-width'),
      itemMargin: $(this).data('item-margin'),
      move: 1,
      controlNav: typeof $(this).data('item-controls-on') !== 'undefined' ? true : false,
      slideshow: false,
      minItems: $(this).data('min-items') || 1,
      maxItems: $(this).data('max-items') || 5
    };
    
    var navFor = $(this).data('navfor');
    if (navFor !== '') {
      carouselSettings = $.extend({}, carouselSettings, {
        asNavFor: '#'+ navFor
      });
    }
    
    $(this).flexslider(carouselSettings);
  });
  
  //flexslider
  $('.flexslider').each(function(i) {
    var currentFlexslider = $(this);
    
    //passable settings
    var sliderNav = $(this).data('slidernav') || 'auto';
    var autoStartOff = $(this).data('autostartoff') || false;
    var animation = $(this).data('transition') || 'fade';
    $(this).addClass('flexslider-animation-'+ animation);
 
    var sliderSettings =  {
      id: 'flexslider-'+ i,
      animation: animation,
      selector: ".slides > .slide",
      controlNav: $(this).data('controlnav'),
      directionNav: $(this).data('directionnav'),
      smoothHeight: $(this).data('smoothheight'),
      minItems: $(this).data('min-items') || 1,
      maxItems: $(this).data('max-items') || 1,
      multipleKeyboard: true      
    };

    if (sliderNav !== 'auto') {
      sliderSettings = $.extend({}, sliderSettings, {
        manualControls: sliderNav +' li a',
        controlsContainer: '.flexslider-wrapper'
      });
    }

    currentFlexslider.flexslider(sliderSettings);
    
    if (autoStartOff === true) {
      currentFlexslider.flexslider("pause");
    }
  });
  
  //projects display
  var fullView = $('#full-view');
  if (fullView.size() > 0) {
    var fullViewParent = fullView.parent();
    fullView.prepend('<a class="close">Close</a>');
    
    //hide full view by default
    fullView.hide();
    var fullViewOpen = false;

    //pager navigation show/hide flexslider
    var workItems = $('#work .item a');
    workItems.removeClass('flex-active');
    workItems.on('click touchstart', function(e) {
      if (fullViewOpen === false) {         
        fullView.slideDown('slow', function() {
          fullViewOpen = true;
          $(this).addClass('flex-active');
        });
      }

      $('html, body').animate({
         scrollTop: fullViewParent.offset().top - ($('.navbar-inner').height() + 5) //navbar height
      }, 500);        
      e.preventDefault();
    });
    
    //close link
    fullView.find('.close').on('click touchstart', function() {
      fullView.slideUp('slow');
      fullViewOpen = false;
      $('html, body').animate({
         scrollTop: $('#work').offset().top - ($('.navbar-inner').height() + 5) //navbar height
      }, 500);       
      $('#work .item a').removeClass('flex-active');
    });
  }
  
  
});