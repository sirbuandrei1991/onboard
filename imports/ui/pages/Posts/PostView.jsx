import React from 'react';
import CommentSchema from '/db/comments/schema';
import Security from '/imports/api/security';
import { AutoForm, AutoField, Select, LongTextField, HiddenField, ErrorsField } from 'uniforms-unstyled';

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: null};
    }
    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    submitcomments = (comment) => {
        Meteor.call('comment.add', comment, (err) => {
            console.log(comment);
            if (err) {
                return alert(err);
            }
            alert('Comment added!')
        });
    };

    render() {
        const {history} = this.props;
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }
        Meteor.call('post.countviews', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
        return (
            <div className="container">
                <div className="post-details">
                <h2>Detalii articol</h2>
                    <p>Post id: {post._id}</p>
                    <p>Post title: {post.title}</p>
                    <p>Post description: {post.description}</p>
                    <p>Date the post has been created : {post.createdAt}</p>
                    <p>How many views? => {post.views + 1}</p>
                </div>
                <div className="comentarii">
                <h2>Comentarii</h2>
                    <div className="adaugare-comentarii-form">
                    <AutoForm onSubmit={this.submitcomments} schema={CommentSchema}>
                        <ErrorsField/>
                        <AutoField name="title"/>
                        <LongTextField name="description"/>

                        <HiddenField name="postId" value={post._id} />
                        <button type='submit'>Add post</button>
                    </AutoForm>
                    </div>
                    <div className="vizualizare-comentarii">

                    </div>
                </div>
            </div>
        )
    }
}