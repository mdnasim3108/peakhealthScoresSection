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
    const part = "snippet,statistics,contentDetails"
    
    const youtubeUrl = "https://www.youtube.com/watch?v=aUBawr1hUwo"
    const youtubeId = youtubeUrl.split("=")
    const speaker = "Male"
    const speechCategory = "Author"
    const ActionType = "Mindfulness"

    const responseData = await  axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${youtubeId}&key=${key}`)
    
    const channelId =  responseData.data.items[0].snippet.channelId
    const channelData = await axios.get (`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${key}`)
    const channelLogo =channelData.data.items[0].snippet.thumbnails.default.url
   
    const title =  responseData.data.items[0].snippet.title
    const duration = responseData.data.items[0].contentDetails.duration

    let array=duration.match(/(\d+)(?=[MHS])/ig)||[];   
    var videoDuration=array.map(function(item){
        if(item.length<2) return '0'+item;
        return item;
    }).join(':');

    const channelTitle = responseData.data.items[0].snippet.channelTitle
    const publishedAt = responseData.data.items[0].snippet.publishedAt.split("T")[0]
    const thumbnailUrl = responseData.data.items[0].snippet.thumbnails.default.url
    const categoryId = responseData.data.items[0].snippet.categoryId
    const tag = responseData.data.items[0].snippet.tags
    const views = responseData.data.items[0].statistics.viewCount
    const likes = responseData.data.items[0].statistics.likeCount
    const description = responseData.data.items[0].snippet.description
    const recommendationData = new recommendationModel ({
        youtubeURL:youtubeUrl,
        channelTitle:channelTitle,
        channelLogo:channelLogo,
        videoTitle:title,
        speakerGender:speaker,
        speakerCategory:speechCategory,
        actionType:ActionType,
        videoDuration:videoDuration,
        publishedAt:publishedAt,
        thumbnailURL:thumbnailUrl,
        categoryID:categoryId,
        tags:tag,
        views:views,
        likes:likes,
        videoDescription:description,
    })

    try {
        // const result = await recommendationData.save();
       
        res.json(recommendationData._id.valueOf())
    } catch (err) {
        res.send(err.message)
    }
   
}
