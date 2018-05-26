import React from 'react';
import { AutoForm, AutoField, Select, LongTextField, HiddenField, ErrorsField } from 'uniforms-unstyled';

import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
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
          };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };
    render() {
        const {history} = this.props;
        const { categories, value } = this.state;
        
        var date = new Date(),
        curdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        return (
            <div className="container">
                <div className="post">
                    <AutoForm onSubmit={this.submit} schema={PostSchema}>
                        <ErrorsField/>
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
                        <button type='submit'>Add post</button>
                        <button onClick={() => history.push('/posts')}>Back to posts</button>
                    </AutoForm>
                </div>
            </div>
        )
    }
}
