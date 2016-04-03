var CommentList = React.createClass({
  render: function() {

    // creates comment nodes
    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment author={comment.author} >
          {comment.text}
        </Comment>
      )
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});