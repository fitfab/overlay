/* SmartOverlay Creates Constructor */
var SmartOverlay = function(map) {
  var $win = $(window);
  this.defaults = { width: 780, height: 'auto', background: 'white'};
  this.$bg = $( '<div class="opaque transit"></div>' ).appendTo('body');
  this.$el = $('<div class="modal transit"><b class="modal-close"></b></div>')
              .append('<div class="modal-content"></div>');

  // Listen to any call to the overlay
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

  this.$el.appendTo('body');
};

/* SmartOverlay Prototype */
SmartOverlay.prototype = function(){

  var open = function(options) {
    var settings = $.extend( {}, this.defaults, options.prop );
    console.log(settings);
    // Shows the background
    this.$bg.addClass('open');

    // Update content
    this.$el.find('.modal-content').html(options.content);
    this.$el.addClass('open');

    this.transit(settings);
  };

  var closeModal = function(){
    this.$el.removeClass('open');
    this.$bg.removeClass('open');
  };

  // using css3 to do transitions
  var animate = function( prop ) {
    var deferred = $.Deferred();
    this.$el.css(prop);

    // Listening to transitionend
    this.$el.on('transitionend webkitTransitionEnd', function(e){
      deferred.resolve(e);
    });
    // return a promise
    return deferred.promise();
  };

  return {
    'transit': animate,
    'open': open,
    'closeModal': closeModal
  };

}();