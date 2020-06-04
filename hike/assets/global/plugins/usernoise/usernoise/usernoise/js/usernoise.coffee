MiniRequire = require('./vendor/minirequire/minirequire.coffee')

jQuery.extend usernoise,
  isMobileDevice: -> jQuery(window).width() < 768
  miniRequire: new MiniRequire(baseUrl: usernoise.config.urls.usernoise + "js", shim: {
    'jQuery': jQuery
  }),
  window:
    show: (bindTo)->
      _this = this
      usernoise.miniRequire.require ['popup/dist/popup'], (popup)->
        props = {}
        if bindTo
          bindTo = jQuery(bindTo)
        if !bindTo and _this != usernoise.window
          bindTo = jQuery(_this)

        if bindTo and bindTo.is('#un-button')
          if bindTo.is('.un-left')
            offset = {top: (bindTo.outerWidth() - bindTo.outerHeight()) / 2, left: -bindTo.outerHeight()}
            props.offset = offset
        props.bindTo = bindTo if bindTo
        el = jQuery('<div class="un-popup un-fade-transition"></div>')
        jQuery('body').append(el)
        usernoise.window.current = popup(el[0], props)

    hide: ->
      elements = jQuery("#un-overlay, #un-iframe, #un-loading}")
      elements.removeClass 'un-visible'
      setTimeout((-> elements.remove()), 500)

jQuery ($)->
  return  if navigator and navigator.appVersion and (navigator.appVersion.indexOf("MSIE 6.0") isnt -1 or navigator.appVersion.indexOf("MSIE 7.0") isnt -1)
  usernoise.miniRequire.require ['vendor/vue', 'popup/dist/popup'], ->
    if usernoise.config.button.enabled and !(window.usernoise.isMobileDevice() and usernoise.config.button.disableOnMobiles)
      button = $('<button id="un-button" rel="usernoise"/>')
      button.text(usernoise.config.button.text)
      button.attr style: usernoise.config.button.style
      $('body').append button
      button.addClass usernoise.config.button['class']
      setTimeout((-> button.addClass 'un-visible'), 1)
      handleButtonClick = (e)->
        e.preventDefault()
        e.stopPropagation()
        usernoise.window.show(this)
      selector = 'a[rel=usernoise], button[rel=usernoise], a[href="#usernoise"]'
      if $.on
        $.on 'click', selector, handleButtonClick
      else
        $(selector).click handleButtonClick
