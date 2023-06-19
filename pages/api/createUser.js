import connectMongo from "../../utils/connectMongo";
import peakHealthUsers from "../../models/user";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createUser(req, res) {
    const {email,gender,year,ip}=req.body.details;
    let userData
    await connectMongo();
    userData=await new peakHealthUsers({gender,year,ip,email});
    await userData.save();
    res.json(userData._id.valueOf())
}
