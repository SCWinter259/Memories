import mongoose from "mongoose";

// schema works kinda like SQLite
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// above is a schema, here we export a model (like a SQLite table)
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;