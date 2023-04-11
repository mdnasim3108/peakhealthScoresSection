import axios from 'axios';
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createUser(req, res) {
    const ipdata = await axios.get("https://geolocation-db.com/json/");
    res.json(ipdata.data.IPv4)
}