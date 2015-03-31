/* SmartOverlay Creates Constructor */
var SmartOverlay = function(map) {
  $win = $(window);
  this.$body = $('body');
  this.$iframe = $('<iframe id="modal-iframe" />');
  this.defaults = { width: 780, height: 'auto', background: '#fff'};
  this.$bg = $(this.htmlWrapper()).hide().appendTo('body');
  this.$el = $(this.htmlModal());
              
  // Listen for call to the overlay from a click event
  $win.on('click', function(e){
    if ( $(e.target).hasClass('overlayTrigger') ){
      var options = $(e.target).data("dialog");
      this.open(map[options]);
    }
  }.bind(this));

  // Listen to the "modal:close" event
  $win.on('modal:close', function(){
    this.closeModal();
  }.bind(this));

  // X icon triggers "modal:close" event
  this.$el.on('click', '.modal-close', function(){
    $(this).trigger('modal:close');
  });

 // clicking gray background triggers 'modal:close' event
  this.$bg.on('click', function(){
    $(this).trigger('modal:close');
  });

  // Listening to the iframe
  $win.on('message', function(e){

    // Iframe is ready
    if(e.originalEvent.data === 'iframe:ready'){
      this.$el.find('.modal').addClass('loaded');
      return;
    };

    // Iframe requesting the overlay to be closed
    if(e.originalEvent.data === 'iframe:close'){
      this.$el.trigger('modal:close');
      return;
    };

  }.bind(this));

  //this.$el.appendTo('body');
  this.$bg.append(this.$el);
};

/* SmartOverlay Prototype */
SmartOverlay.prototype = {
  htmlWrapper : function(){
    return '<div class="modal-wrapper"><div class="opaque"></div></div>';
  },

  htmlModal : function(){
    var str = '<div class="modal-viewport"><div class="modal transit">'
            + '<b class="modal-close"></b><div class=loader></div>'
            + '<div class="modal-content"></div></div></div>';
    return str;
  },

  open : function( options) {
    var settings = $.extend( {}, this.defaults, options.prop );
    // set body to overflow hidden
    this.$body.addClass('modal-on');
    // Shows the background
    this.$bg.show().addClass('open');

    if( options.iframe && options.url) {
      options.content = this.$iframe.attr("src", options.url);
    } else {
      this.$el.find('.modal').addClass('loaded');
    };

    this.$el.find('.modal-content').html(options.content);
    

    // apply styles to the modal
    this.$el.find('.modal').css(settings).addClass('open');;
  },

  closeModal : function(){
    this.$body.removeClass('modal-on');
    this.$el.find('.modal').removeClass('open loaded');
    this.$bg.removeClass('open').hide();
  }
};