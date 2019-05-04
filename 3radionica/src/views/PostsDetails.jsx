import React, { Component } from "react";
import "../css/App.css";

export class PostsDetails extends Component {
  state = {
    details: undefined,
    comments: undefined
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
  renderItem = ({ id, name, email, body }) => (
    <div className="comments" key={id}>
      <p className="comments__name">{name}</p>
      <p className="comments__email">{email}</p>
      <p>{body}</p>
    </div>
  );
  render() {
    const { comments } = this.state;
    if (!comments) {
      return <p>Nema komentara</p>;
    }
    return (
        <div className="wrapper">
            {comments.map(item => this.renderItem(item))}
        </div>
    );
  }
}
