import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Posts extends Component {
  state = {
    posts: undefined
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json =>
        this.setState({
          posts: json
        })
      )
      .catch(error => console.log(error));
  }
  renderItem = ({ id, title }) => (
    <div key={id}>
      <Link className="posts" to={`/posts/${id}`}>
        <p className="posts__title">{title}</p>
      </Link>
    </div>
  );

  render() {
    const { posts } = this.state;
    if (!posts) {
      return <p>Loader</p>;
    }
    return (
      <>
        <h1 className="posts__headline">Posts</h1>
        <div className="wrapper">
          {posts.map(item => this.renderItem(item))}
        </div>
      </>
    );
  }
}
