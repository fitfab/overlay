/* SmartOverlay Creates Constructor */
var SmartOverlay = function(map) {
  var $win = $(window);
  this.defaults = { width: 780, height: 'auto', background: 'white'};
  this.$bg = $( '<div class="opaque transit"></div>' ).hide().appendTo('body');
  this.$el = $('<div class="modal transit"><b class="modal-close"></b></div>')
              .append('<div class="modal-content"></div>');

  // Listen for call to the overlay from a click event
  $win.on('click', function(e){
    e.preventDefault();
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

  this.$el.appendTo('body');
};

/* SmartOverlay Prototype */
SmartOverlay.prototype = {

  open : function( options) {
    var settings = $.extend( {}, this.defaults, options.prop );
    // Shows the background
    this.$bg.show().addClass('open');

    // Update content
    this.$el.find('.modal-content').html(options.content);
    this.$el.addClass('open');

    this.transit(settings);
  },

  closeModal : function(){
    this.$el.removeClass('open');
    this.$bg.removeClass('open').hide();
  },

  // using css3 to do transitions
  transit : function( prop ) {
    var deferred = $.Deferred();
    this.$el.css(prop);

    // Listening to transitionend
    this.$el.on('transitionend webkitTransitionEnd', function(e){
      deferred.resolve(e);
    });
    // return a promise
    return deferred.promise();
  }
};