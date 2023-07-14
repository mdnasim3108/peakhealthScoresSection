import connectMongo from "../../utils/connectMongo";
import errorLogs from "../../models/errorLogs";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function logError(req, res) {
  const { ip,browser,error,errorText} = req.body;
  await connectMongo();
  const errorLog=error?await new errorLogs({ip,browser,error}):await new errorLogs({ip,browser,errorText})
  errorLog.save()
  res.send()
}   