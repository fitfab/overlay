var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="comment-author">
          {this.props.author} 
        </h4>
        {this.props.children}
      </div>
    );
  }
});