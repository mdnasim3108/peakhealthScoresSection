import connectMongo from "../../utils/connectMongo";
import peakHealthUsers from "../../models/user";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createUser(req, res) {
    const {email}=req.body;
    await connectMongo();
    const user=await peakHealthUsers.findOne({email})
    if(user) res.json(user)
    else res.json("not found")
}
