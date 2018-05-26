import React from 'react';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;
        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="container">
                <div className="post">
                    {
                        posts.map((post) => {
                            return (
                                <div className="article" key={post._id}>
                                    <p>Post id: <span>{post._id}</span> </p>
                                    <p>Post title: <span>{post.title}</span></p>
                                    <p>Post Description: <span>{post.description}</span> </p>
                                    <p>Post category: <span>{post.categories}</span></p>
                                    <p>Post views: <span>{post.views}</span></p>
                                    <p>Post created at: <span>{post.createdAt}</span></p>
                                    <button onClick={() => {
                                        history.push("/posts/edit/" + post._id)
                                    }}> Edit post
                                    </button>
                                    <button onClick={() => history.push('/posts/view/' + post._id)}>View Post</button>
                                </div>
                            )
                        })}
                </div>

                    <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
