import connectMongo from "../../utils/connectMongo";
import peakHealthUsers from "../../models/user";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createUser(req, res) {
    const {username,email,gender,year,ip}=req.body.details;
    await connectMongo();
    const userData=await new peakHealthUsers({username,email,gender,year,ip});
    await userData.save();
    res.json(userData._id.valueOf())
}
