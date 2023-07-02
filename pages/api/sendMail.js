import sendgrid from '@sendgrid/mail';
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  try{

 
    if (req.method === 'POST') {
      const { to,otp,firstName } = req.body;
      
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  
      const emailData = {
        to,
        from: 'support@peakhealth.tech',
        subject:"[OTP] Activate your Stress Sense AI account",
        html: `<p>Hi ${firstName}</p>
        
        <p>Thank you for signing up.</p>
        
        <p>Let's activate your personal Stress Sense AI Assistant.</p>
        
        <p>Please use this One Time Password (OTP) to register your account.</p>
        
        <p>${otp}</p>
        
        <p>This OTP is valid for only 10 minutes.</p>
        
        <p>If your have trouble logging in please contact</p>

        <p>support@peakhealth.tech</p>
        
        <br></br>
        
        <p><b>Stress Sense AI Team</b></p>

        <img src="https://check.peakhealth.tech/phLogoTextS.png" alt="logo"/>

        <p>© Peak Health Technologies</p>
        `,
      };
      
      try {

        await sendgrid.send(emailData);
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        res.json({ message:error });
        console.log(error)
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  catch(er){
    res.json(er)
  }
  }