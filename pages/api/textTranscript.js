import connectMongo from "../../utils/connectMongo";
import peakHealthUsers from "../../models/user";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function scores(req, res) {
  const { id,text} = req.body;
  await connectMongo();
  await peakHealthUsers.updateOne(
    { _id:id },
    { $set: { transcript:text } }
  );
  res.send()
}