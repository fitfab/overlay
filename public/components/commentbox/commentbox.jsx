// tutorial1.js
var CommentBox = React.createClass({

  getInitialState: function() {
    // initial data to empty
    return {data: []};
  },

  loadComments: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        this.props.counter ++;
        console.log('Ajax call Counter: '+this.props.counter)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        console.debug(xhr)
      }.bind(this)
    });
  },

  handleCommentSubmit : function(comment){
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    // TODO: save to the server
  },

  componentDidMount: function() {
    this.loadComments();
    //setInterval(this.loadComments, this.props.pollInterval)
  },

  render: function() {
    return (
      <div className="commentBox">
        {console.log('At render:' + this.props.counter)}
        <h2>Comments</h2>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }

});

React.render(
  <CommentBox url="/components/commentbox/data.json" pollInterval={7000} counter={0}/>,
  document.getElementById('app-wrapper')
);