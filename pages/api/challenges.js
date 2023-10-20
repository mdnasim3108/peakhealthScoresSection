import connectMongo from "../../utils/connectMongo";
import challenges from "../../models/challenges";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function guessScore(req, res) {
    const {goals}=req.body;
    await connectMongo();
    const challengeData=await challenges.find()
    // await peakHealthUsers.updateOne({_id:id},{$set:{guessScore}});
    res.send(challengeData)
}