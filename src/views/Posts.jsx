import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../components";

export class Posts extends Component {
  state = {
    posts: undefined,
    currentPage: 1,
    itemsPerPage: 5,
    totalCount: 100 //ne trebam sam staviti, ali ne iscitava on nez zas
  };

  setPage = event => {
    const { value } = event.target;
    this.setState({
      currentPage: parseInt(value)
    });
  };

  setTotalCount = posts => {
    this.setState({
      totalCount: posts.length
    });
  };

  componentDidMount() {
    const { posts } = this.state;
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json =>
        this.setState({
          posts: json
        })
      )
      .then(() => this.setTotalCount(posts)) //zasto ovo baca undefined na posts?
      .catch(error => console.log(error));
  }
  componentWillUpdate(nextProps) {
    const { posts } = this.props;
    if (posts !== nextProps.todos) {
      this.setTotalCount(nextProps.props);
    }
  }
  renderItem = ({ id, title }) => (
    <div key={id}>
      <Link className="posts" to={`/posts/${id}`}>
        <p className="posts__title">{title}</p>
      </Link>
    </div>
  );

  render() {
    const { posts, currentPage, itemsPerPage } = this.state;
    if (!posts) {
      return <p>Loader</p>;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedPosts = posts.slice(startIndex, endIndex);
    return (
      <>
        <h1 className="posts__headline">Posts</h1>
        <div className="wrapper">
          {pagedPosts.map(item => this.renderItem(item))}
          <Pagination {...this.state} setPage={this.setPage} />
        </div>
      </>
    );
  }
}
