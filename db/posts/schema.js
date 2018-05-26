import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
        type: Number,
        optional: false
    },
    createdAt: {
        type: String,
        optional: false
    },
    categories: String,
});