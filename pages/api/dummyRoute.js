import connectMongo from "../../utils/connectMongo";
import recommendationModel from "../../models/recommendationmodel";
import axios from "axios";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createUser(req, res) {
    
    await connectMongo();
    const key = "AIzaSyBbJ1C3DAdIu3mfUOoXdw2TGnnB92qP5r8"
    const part = "snippet,statistics"
    
    const youtubeUrl = "https://www.youtube.com/watch?v=t1rRo6cgM_E"
    const youtubeId = youtubeUrl.split("=")

    const responseData = await  axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${youtubeId}&key=${key}`)
    
   
    const title =  responseData.data.items[0].snippet.title
    const speaker = "Female"
    const speechCategory = "Meditation Teacher"
    const ActionType = "Visualization"
  
    const duration = "10:57"
    const channelTitle = responseData.data.items[0].snippet.channelTitle

    const thumbnailUrl = responseData.data.items[0].snippet.thumbnails.default.url
    const categoryId = responseData.data.items[0].snippet.categoryId
    const tag = responseData.data.items[0].snippet.tags
    const views = responseData.data.items[0].statistics.viewCount
    const likes = responseData.data.items[0].statistics.likeCount
    const description = responseData.data.items[0].snippet.description
    
    
    // console.log(responseData.data.items[0].snippet)
    const recommendationData = new recommendationModel ({
        youtubeURL:youtubeUrl,
        channelTitle:channelTitle,
        videoTitle:title,
        speakerGender:speaker,
        speakerCategory:speechCategory,
        actionType:ActionType,
        videoDuration:duration,
        thumbnailURL:thumbnailUrl,
        categoryID:categoryId,
        tags:tag,
        views:views,
        likes:likes,
        videoDescription:description,
        author:"",
        authorLogo:""
    })

    // res.json(tags)
    try {
        const result = await recommendationData.save();
        console.log(result)
        res.json(recommendationData._id.valueOf(),result)
    } catch (err) {
        res.send(err.message)
    }
    // res.send("Happy")
}
