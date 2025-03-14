import mongoose from "mongoose";

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
    }
});

const communitySchema = new mongoose.Schema({
    posts: [postSchema]
});

export const Community = mongoose.model("Community", communitySchema);