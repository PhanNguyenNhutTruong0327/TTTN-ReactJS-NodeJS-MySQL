const fastify = require('fastify')();
const nodemailer = require('nodemailer');

fastify.register(require('fastify-cors'));

fastify.post('/send-otp', async (request, reply) => {
  const { method, recipient } = request.body;

  // Gửi mã OTP dựa trên method và recipient
  const otpCode = generateOTP();

  if (method === 'phone') {
    // Gửi mã OTP qua tin nhắn SMS
    // Sử dụng thư viện Twilio hoặc dịch vụ SMS khác
    sendSMS(recipient, otpCode);
  } else if (method === 'email') {
    // Gửi mã OTP qua email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: recipient,
      subject: 'Mã OTP',
      text: `Mã OTP của bạn là: ${otpCode}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Mã OTP đã được gửi thành công');
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gửi OTP:', error);
    }
  }

  reply.send({ message: 'Mã OTP đã được gửi' });
});

fastify.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server listening on port 3000');
});

// Hàm generateOTP để tạo mã OTP ngẫu nhiên
const generateOTP = () => {
  // Logic để tạo mã OTP ngẫu nhiên
};

// Hàm sendSMS để gửi tin nhắn SMS
const sendSMS = (phoneNumber, otpCode) => {
  // Logic để gửi tin nhắn SMS
};