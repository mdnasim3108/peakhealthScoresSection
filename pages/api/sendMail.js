import sendgrid from '@sendgrid/mail';
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {

    if (req.method === 'POST') {
      const { to,otp } = req.body;
      
      sendgrid.setApiKey("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");
  
      const emailData = {
        to,
        from: 'support@peakhealth.tech',
        subject:"OTP verification",
        text: `The OTP for authentication is ${otp}`,
      };
  
      try {
        await sendgrid.send(emailData);
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        // res.status(500).json({ message: 'Failed to send email' });
        console.log(error)
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }