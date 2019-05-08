import React, { Component } from "react";
export class PostsDetails extends Component {
  //dodat paginaciju jos
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
        .then(details => {
          this.setState({
            details
          });

          return details.userId;
        })
        .then(userId =>
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
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
  renderComments = () => {
    const { comments } = this.state;
    if (!comments) {
      return <p>Nema komentara</p>;
    }

    return comments.map(item => (
      <div className="comments" key={item.id}>
        <p className="comments__name">{item.name}</p>
        <p className="comments__email">{item.email}</p>
        <p>{item.body}</p>
      </div>
    ));
  };

  renderPostDetails = () => {
    const { details } = this.state;
    if (!details) {
      return <p>Podaci nisu dostupni</p>;
    }

    return (
      <div className="post" key={details.id}>
        <p className="post__title">{details.title}</p>
        <p className="post__body">{details.body}</p>
      </div>
    );
  };
  renderAuthor = () => {
    const { author } = this.state;
    if (!author) {
      return false;
    }

    return (
      <div className="author" key={author.id}>
        <p className="author__username">{author.username}</p>
        <p className="author__website">{author.website}</p>
      </div>
    );
  };

  render() {
    return (
      <div className="wrapper">
        {this.renderAuthor()}
        {this.renderPostDetails()}
        {this.renderComments()}
      </div>
    );
  }
}
