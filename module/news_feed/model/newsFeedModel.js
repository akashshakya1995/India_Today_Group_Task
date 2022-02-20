const mongoose = require("mongoose");
const newsFeedSchema = mongoose.Schema(
    {
        author_name: { type: String, required: true },
        thumbnail_url: { type: String, required: true },
        headline: { type: String, required: true },
        category: { type: String, enum: ["Tech", "UI", "Design", "AI", "Marketing"], required: true },
        createdAt: Number,
        updatedAt: Number
    },
    { timestamps: true }
);

const newsFeedModel = mongoose.model("news_feed", newsFeedSchema);
module.exports = { newsFeedModel };