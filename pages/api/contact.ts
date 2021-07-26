import mail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { State } from 'components/ContactForm';

mail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  try {
    const body: State = JSON.parse(req.body);

    const message = `
    Name: ${body.first_name} ${body.last_name}\r\n

    Email: ${body.email}\r\n
    
    Phone Number: ${body.phone_number}\r\n
    
    How long...: ${body.how_long}\r\n
    
    How soon...: ${body.how_soon}\r\n
    
    What skills...: ${body.what_skills}\r\n
    
    Message: ${body.message}\r\n
  `;

    const data = {
      to: process.env.EMAIL_TO || '',
      from: process.env.EMAIL_FROM || '',
      subject: `New Submission from ${body.first_name} ${body.last_name}`,
      text: message,
      html: message.replace(/\r\n/g, '<br />'),
    };

    await mail.send(data);

    res.status(200).json({ message: 'Success, email sent.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
