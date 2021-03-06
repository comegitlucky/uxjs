// Generated by CoffeeScript 1.8.0
var Uxify, _autoScrollUp, _detectScroll, _disableAutoScrollUp, _explodingButtons, _initClickAndDissapear, _jumpyElements, _randomMessages;

Uxify = function(option, more) {
  this.options = $.extend(true, {}, $.fn.Uxify.defaults, option);
  return this.init();
};

_initClickAndDissapear = function(klass) {
  $('*').bind('click', function(e) {
    var img_style, laugh_style;
    e.stopPropagation();
    if (klass.options.explodingButtons && $(this).is('button') || ($(this).is('a') && $(this).hasClass('btn'))) {
      return false;
    }
    if ($(this).is('head') || $(this).is('body') || $(this).is('html')) {
      if ($('body').children('div').length === 1) {
        laugh_style = 'font-weight:bold; font-size:75px; text-align:center; display:block;';
        img_style = 'width:100%';
        $('body').css({
          'padding-top': 0
        });
        $('body').html('<span style="' + laugh_style + '">HAHAHAHA - This is UX BITCH!</span>');
        $('body').append('<img style="' + img_style + '" src="./assets/joker.jpg">');
        $('body span').effect("highlight", {}, 3000);
      }
      return false;
    }
    if ($(this).is('body') || $('body').find('div').length === 1) {
      alert('body');
      return false;
    }
    e.preventDefault();
    $(e.target).remove();
  });
};

_detectScroll = function(handler) {
  $(window).bind('scroll', handler);
};

_autoScrollUp = function() {
  this.timeout = null;
  $(window).on('scrolldown', function() {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(function() {
      return $('html, body').animate({
        scrollTop: 0
      }, 'slow');
    }, 1000);
  });
};

_disableAutoScrollUp = function() {
  window.clearTimeout(this.timeout);
  return $(window).unbind('scroll', this.scrollHandler);
};

_jumpyElements = function() {
  var max;
  max = 500;
  $('img').hover(function(e) {
    var x, y;
    e.stopPropagation();
    x = Math.floor(Math.random() * max + 1);
    y = Math.floor(Math.random() * max + 1);
    $(this).css({
      top: y,
      left: x,
      position: 'absolute'
    });
  });
};

_explodingButtons = function() {
  $('button, a.btn').click(function(e) {
    var postRemove;
    e.preventDefault();
    e.stopPropagation();
    postRemove = function() {
      $(this).remove();
      alert('Where you trying to go huh!?');
    };
    return $(this).hide('explode', {
      pieces: 100
    }, 1000, postRemove);
  });
};

_randomMessages = function(messages) {
  return window.setInterval(function() {
    var elem, max, message_id;
    elem = $('.uxify-alert');
    max = messages.length;
    message_id = Math.floor(Math.random() * max);
    return $(elem).html(messages[message_id]).removeClass('hide');
  }, 4000);
};

Uxify.prototype = {
  constructor: Uxify,
  scrollHandler: function() {
    var lastScrollTop, scrollTop;
    lastScrollTop = 0;
    scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
      $(window).trigger('scrolldown');
    } else {
      $(window).trigger('scrollup');
    }
    lastScrollTop = scrollTop;
  },
  init: function() {
    if (this.options.click_and_dissapear) {
      _initClickAndDissapear(this);
    }
    if (this.options.auto_scroll_up || this.options.reverse_scroll) {
      _detectScroll(this.scrollHandler);
    }
    if (this.options.auto_scroll_up) {
      _autoScrollUp();
    }
    if (this.options.jumpy_elements) {
      _jumpyElements();
    }
    if (this.options.exploding_buttons) {
      _explodingButtons();
    }
    if (this.options.random_messages) {
      _randomMessages(this.options.messages);
    }
  },
  disable: function(plugin) {
    var _plugin;
    if (typeof plugin !== 'string' || this.options[plugin] === 'undefined') {
      return false;
    }
    _plugin = plugin.toLowerCase();
    if (plugin === 'auto_scroll_up') {
      this.options[plugin] = false;
      return _disableAutoScrollUp();
    }
  },
  enable: function(plugin) {
    if (typeof plugin !== 'string' || this.options[plugin] === 'undefined') {
      return false;
    }
    if (plugin === 'auto_scroll_up') {
      this.options[plugin] = true;
      _detectScroll(this.scrollHandler);
      return _autoScrollUp();
    }
  }
};

$.fn.Uxify = function(option, more) {
  var data, options, self;
  self = $(this);
  data = self.data('uxify');
  options = typeof option === 'object' && option;
  console.log(data);
  if (!data) {
    self.data('uxify', (data = new Uxify(this, options)));
  }
  if (typeof option === 'string') {
    console.log(data);
    data[option](more);
  }
  return this;
};

$.fn.Uxify.defaults = {
  click_and_dissapear: true,
  auto_scroll_up: true,
  reverse_scroll: false,
  jumpy_elements: true,
  exploding_buttons: true,
  random_messages: true,
  messages: ['How you doin\'?', 'What up hotti!?', 'Imma pop a cap in you knee fool!', 'I love you, you love me, we\'re a geeky family!', 'Hola Senior, como estas in the Internets?', 'It\'s so fluffy!!!', 'I did not have geeky relations with that woman! ...I think...', 'So... how you like being UXified!?', 'Our website is not broken... you are! ;)', 'If something does not work, contact us at "wedontcare@screwyou.com"', 'Hey there! Today is "Stupid User Day" and you are our "Stupidest User"! How stupid!']
};

$.fn.Uxify.Constructor = Uxify;
