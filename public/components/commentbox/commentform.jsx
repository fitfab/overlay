var CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var author  = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if(!text || !author) {
      return;
    }
    //TODO: send request to the server
    this.props.onCommentSubmit({author: author, text: text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    React.findDOMNode(this.refs.author).focus();
    return;
    },
  render: function() {
    return (
      <div>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <input className="textbox" type="text" placeholder="Your name" ref="author"/>
          <input className="textbox" type="text" placeholder="Say something..." ref="text"/>
          <input className="button" type="submit" value="Post" />
        </form>
      </div>
    );
  }
});