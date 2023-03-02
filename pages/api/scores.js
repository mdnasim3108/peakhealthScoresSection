import connectMongo from "../../utils/connectMongo";
import peakHealthUsers from "../../models/user";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createUser(req, res) {
  const { username, score, voiceFeatures } = req.body;
  await connectMongo();

  await peakHealthUsers.updateOne(
    { username },
    { $set: { score, voiceFeatures } }
  );
}
