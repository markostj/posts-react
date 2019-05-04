import React, { Component } from "react";
import "../css/App.css";
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
      <Link className="posts__title" to={`/posts/${id}`}>{title}</Link>
    </div>
  );

  render() {
    const { posts } = this.state;
    if (!posts) {
      return <p>Loader</p>;
    }
    return (
      <div className="wrapper">
        {posts.map(item => this.renderItem(item))}
      </div>
    );
  }
}
