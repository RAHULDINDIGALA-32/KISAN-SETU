import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    text: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upvotes: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    downvotes: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    comments: [commentSchema]
});

const communitySchema = new mongoose.Schema({
    posts: [postSchema]
});

export const Community = mongoose.model("Community", communitySchema);