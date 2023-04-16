import connectMongo from "../../utils/connectMongo";
import peakHealthUsers from "../../models/user";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateVideosData(req, res) {
  const {objId,vId,icons} = req.body;
  await connectMongo();
  const data=await peakHealthUsers.findOne({_id:objId})
  const videos=[...data.videos]
  const id=videos.findIndex((el)=>el.vId===vId)
  videos[id]={vId:videos[id].vId,...icons}
  await peakHealthUsers.updateOne({_id:objId},{$set:{videos}})
  res.send()
}