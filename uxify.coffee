Uxify = (option, more) ->
  # Default options to their defaults
  # _options = $.fn.Uxify.defaults

  # Override defaults if passed in
  # _options = $.extend(true, {}, $.fn.Uxify.defaults, option) if typeof option == 'object'
  @options = $.extend(true, {}, $.fn.Uxify.defaults, option)
  @init()

_initClickAndDissapear = (klass) ->
  $('*').bind('click', (e) ->
    e.stopPropagation()
    # Is this a button with the explosion setup?
    if (klass.options.explodingButtons and $(@).is('button') or ($(@).is('a') and $(@).hasClass('btn')))
      return false

    if $(@).is('head') or $(@).is('body') or $(@).is('html')
      if $('body').children('div').length == 1
        laugh_style = 'font-weight:bold; font-size:75px; text-align:center; display:block;'
        img_style = 'width:100%'
        $('body').css('padding-top':0)
        $('body').html('<span style="' + laugh_style + '">HAHAHAHA - This is UX BITCH!</span>')
        $('body').append('<img style="' + img_style + '" src="./assets/joker.jpg">')
        $('body span').effect("highlight", {}, 3000);
      return false

    # Body Tag? Let's do this!
    if $(@).is('body') or $('body').find('div').length == 1
      alert('body')
      return false

    e.preventDefault()
    $(e.target).remove()
    return
  )
  return

_detectScroll = (handler) ->
  $(window).bind('scroll', handler)
  return

_autoScrollUp = ->
  @timeout = null
  $(window).on('scrolldown', () ->
    window.clearTimeout(@timeout)
    @timeout = window.setTimeout( () ->
      $('html, body').animate({ scrollTop: 0 }, 'slow')
    ,1000)
    return
  )
  return

_disableAutoScrollUp = ->
  window.clearTimeout(@timeout)
  $(window).unbind('scroll', @scrollHandler)

_jumpyElements = ->
  max = 500
  $('img').hover((e) ->
    e.stopPropagation()
    x = Math.floor(Math.random() * max + 1)
    y = Math.floor(Math.random() * max + 1)
    $(@).css(top: y, left: x, position: 'absolute')
    return
  )
  return

_explodingButtons = ->
  $('button, a.btn').click((e) ->
    e.preventDefault()
    e.stopPropagation()

    # $(@).replaceWith('<img src="./assets/explosion.gif">')
    postRemove = () ->
      $(@).remove()
      alert 'Where you trying to go huh!?'
      return
    $(@).hide('explode', pieces: 100, 1000, postRemove)
  )
  return

_randomMessages = (messages) ->
  window.setInterval( () ->
    elem = $('.uxify-alert')
    max = messages.length
    message_id = Math.floor(Math.random() * max)
    $(elem).html(messages[message_id]).removeClass('hide')
  ,4000)

Uxify.prototype =
  constructor: Uxify,

  scrollHandler: ->
    lastScrollTop = 0
    scrollTop = $(@).scrollTop()
    if scrollTop > lastScrollTop
      $(window).trigger('scrolldown')
    else
      $(window).trigger('scrollup')

    lastScrollTop = scrollTop
    return

  # Init all the plugins
  init: ->
    # Init click and dissapear
    _initClickAndDissapear(@) if @options.click_and_dissapear
    _detectScroll(@scrollHandler) if @options.auto_scroll_up or @options.reverse_scroll
    _autoScrollUp() if @options.auto_scroll_up
    _jumpyElements() if @options.jumpy_elements
    _explodingButtons() if @options.exploding_buttons
    _randomMessages(@options.messages) if @options.random_messages
    return

  disable: (plugin) ->
    return false if typeof plugin != 'string' or @options[plugin] == 'undefined'

    _plugin = plugin.toLowerCase()
    if plugin == 'auto_scroll_up'
      @options[plugin] = false
      _disableAutoScrollUp()

  enable: (plugin) ->
    return false if typeof plugin != 'string' or @options[plugin] == 'undefined'

    if plugin == 'auto_scroll_up'
      @options[plugin] = true
      _detectScroll(@scrollHandler)
      _autoScrollUp()

$.fn.Uxify = (option, more) ->
  self = $(@)
  data = self.data('uxify')
  options = typeof option == 'object' and option

  console.log data

  if not data
    self.data('uxify', (data = new Uxify(@, options)))
  if typeof option == 'string'
    console.log data
    data[option](more)
  @

$.fn.Uxify.defaults =
  click_and_dissapear: true
  auto_scroll_up: true
  reverse_scroll: false
  jumpy_elements: true
  exploding_buttons: true
  random_messages: true
  messages: [
    'How you doin\'?',
    'What up hotti!?',
    'Imma pop a cap in you knee fool!',
    'I love you, you love me, we\'re a geeky family!',
    'Hola Senior, como estas in the Internets?',
    'It\'s so fluffy!!!',
    'I did not have geeky relations with that woman! ...I think...',
    'So... how you like being UXified!?',
    'Our website is not broken... you are! ;)',
    'If something does not work, contact us at "wedontcare@screwyou.com"',
    'Hey there! Today is "Stupid User Day" and you are our "Stupidest User"! How stupid!'
  ]

$.fn.Uxify.Constructor = Uxify;
