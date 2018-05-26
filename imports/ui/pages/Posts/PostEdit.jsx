import React from 'react';
import { AutoForm, AutoField, Select, LongTextField, HiddenField, ErrorsField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
              {
                name: 'Select…',
                value: null,
              },
              {
                name: 'Nature',
                value: 'Nature',
              },
              {
                name: 'Psychology',
                value: 'Psychology',
              },
              {
                name: 'Music',
                value: 'Music',
              },
              {
                name: 'Programming',
                value: 'Programming',
              },
              {
                name: 'Project Management',
                value: 'Project Management',
              },
              {
                name: 'Other',
                value: 'Other',
              },
            ],
            value: 'xxx',
            post: null
          };
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    submit = (post) => {
        console.log(post);
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    };
    handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }
    render() {
        const {history} = this.props;
        const {post} = this.state;
        const { categories, value } = this.state;

        if (!post) {
            return <div>Loading....</div>
        }
        var date = new Date(),
        curdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <select name="categories" onChange={this.handleChange.bind(this)}>
                        {categories.map(item => (
                            <option key={item.value} value={item.value}>
                            {item.name}
                            </option>
                        ))}
                    </select>

                    <HiddenField name="categories" value={this.state.value} />
                    <HiddenField name="createdAt" value={curdate} />
                    <HiddenField name="views" value='0' />
                    <button type='submit'>Edit post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
