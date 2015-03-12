  /* SmartOverlay Creates Constructor */
  var SmartOverlay = function(map) {
    var self = this,
        $win = $(window);
    this.$el = $('<div class="modal transit"><div class="modal-header section"><div class="modal-close"></div></div><div class="modal-content"></div></div>');

    $win.on('click', function(e){
      // if an overlay triger was clicked
      if ( $(e.target).hasClass('overlayTrigger') ){
        var options = $(e.target).data("dialog");
        self.open(map[options]);
      }
    });
  };


  /* SmartOverlay Prototype */
  SmartOverlay.prototype = function(){

    var open = function(options) {
      var self = this;

      // Creates the background
      this.$bg = $( "<div></div>" )
        .addClass( "opaque transit" )
        .on({
          click: function( event ) {
            // remove
            $(this).remove();
            self.$el.remove();
          }
        })
        .appendTo( "body" );

      // find and append content
      this.$el.find('.modal-content').html(options.content);
      this.$el.appendTo( "body" );

      // Triggers custom event
      this.$el.on('click', '.modal-close', function(){
        self.$el.trigger('modal:close');
        console.log('triggering');
      });
      // listening to custom event
      this.$el.on('modal:close', function(e){
        self.$bg.remove();
        self.$el.remove();
      });
      if( options && options.prop ) {
        this.transit(options.prop);
      }
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
      'open': open
    };

  }();