import connectMongo from "../../utils/connectMongo";
import recommendations from "../../models/recommendationmodel";
import user from "../../models/user";
import mongoose from "mongoose";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function guessScore(req, res) {
    await connectMongo();
    const data= await recommendations.find({
        '_id': { $in: [
           new mongoose.Types.ObjectId('6436dbc8474ea9d0bd5737dd'),
           new mongoose.Types.ObjectId('6436dd6ad28e6bddc30e36a0'), 
           new mongoose.Types.ObjectId('6436de00d28e6bddc30e36a2')
        ]}
    })
    const {objId}=req.body;
    const extract=data.map((el)=>{
        return {
                authImg: el.channelLogo,
                description: el.videoTitle,
                channelTitle: el.channelTitle,
                category:el.speakerCategory,
                color: "bg-blue-500",
                type: el.actionType,
                duration: el.videoDuration,
                thumbnail:el.thumbnailURL,
                id:el.youtubeURL.split("=")[1]
        }
    })
    res.json(extract)
    const arr=[
        {vId:data[0].youtubeURL.split("=")[1]},
        {vId:data[1].youtubeURL.split("=")[1]},
        {vId:data[2].youtubeURL.split("=")[1]},
]
   await user.updateOne({_id:objId},{$set:{videos:arr}})
}