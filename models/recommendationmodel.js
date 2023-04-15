// import { Schema,model,models } from "mongoose";
import mongoose, { models,Schema } from "mongoose";



var recommendationSchema = mongoose.Schema
(
    {
        youtubeURL:{ type: String },
        videoTitle :{ type: String },
        channelTitle:{type:String},
        channelLogo:{type:String},
        speakerGender :{ type: String },
        speakerCategory:{ type: String },
        actionType:{ type: String },
        videoDuration:{ type: String },
        publishedAt : {type:String},
        thumbnailURL : { type: String },
        categoryID :{ type: String },
        tags :{type:Array},
        views :{ type: String },
        likes:{ type: String },
        videoDescription :{ type: String },
        author : {type:String},
        channelLogo : {type:String}
        
        
    },
    {timestamps:true}
)

var recommendationModel = models.recommendations || mongoose.model("recommendations", recommendationSchema)


// models.peakHealthUsers || model("peakHealthUsers", userSchema);

export default recommendationModel;