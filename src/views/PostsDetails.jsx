import React, { Component } from "react";
import "../css/App.css";

export class PostsDetails extends Component {
  state = {
    details: undefined,
    comments: undefined,
    author: undefined
  };
  componentDidMount() {
    const { match } = this.props;
    if (match && match.params.id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`)
        .then(response => response.json())
        .then(details =>
          this.setState({
            details
          })
        )
        .then(() =>
          fetch(`https://jsonplaceholder.typicode.com/users/${match.params.id}`)
            .then(response => response.json())
            .then(author => this.setState({ author }))
        )
        .then(() =>
          fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${
              match.params.id
            }`
          )
            .then(response => response.json())
            .then(comments => this.setState({ comments }))
        )
        .catch(error => console.log(error));
    }
  }
  renderAuthor = ({ id, username, website }) => (
    <div className="author" key={id}>
      <p className="author__username">{username}</p>
      <p className="author__website">{website}</p>
    </div>
  );

  renderItem = ({ id, name, email, body }) => (
    <div className="comments" key={id}>
      <p className="comments__name">{name}</p>
      <p className="comments__email">{email}</p>
      <p>{body}</p>
    </div>
  );
  
  render() {
    const { comments, author } = this.state;
    console.log(author);
    if (!comments) {
      return <p>Nema komentara</p>;
    }
    return (
      <div className="wrapper">
        {this.renderAuthor()}
        {comments.map(item => this.renderItem(item))}
      </div>
    );
  }
}
