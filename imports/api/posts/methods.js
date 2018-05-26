import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        Posts.insert(post);
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                categories: post.categories,
                createdAt: post.createdAt,
                views: post.views,
            }
        });
    },
    'post.countviews'(_id, post) {
        Posts.update(_id, {
            $set: {
                views: post.views + 1,
            }
        });
    },
    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },

    'comment.add' (comment) {
        console.log('a ajuns in methods // comments');
        //return Comments.insert(comment);
    }
});