import nodemailer from 'nodemailer';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface PaymentConfirmationData {
  to: string;
  customerName: string;
  orderId: string;
  amount: number;
  reference: string;
  orderItems: OrderItem[];
}

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate payment receipt HTML
function generateReceiptHTML(data: PaymentConfirmationData): string {
  const { customerName, orderId, amount, reference, orderItems } = data;
  const date = new Date().toLocaleDateString('en-NG', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const itemsHTML = orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₦${(item.price * item.quantity).toLocaleString('en-NG')}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Confirmation</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background:#873e23; color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Payment Successful! </h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Thank you for your purchase</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
        
        <p style="font-size: 16px;">Dear <strong>${customerName}</strong>,</p>
        
        <p>Your payment has been successfully processed. Below are your order details:</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Order ID:</strong></td>
              <td style="padding: 8px 0; text-align: right;">${orderId.slice(0, 8).toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Payment Reference:</strong></td>
              <td style="padding: 8px 0; text-align: right;">${reference}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Date:</strong></td>
              <td style="padding: 8px 0; text-align: right;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Total Amount:</strong></td>
              <td style="padding: 8px 0; text-align: right; color: #873e23; font-size: 18px; font-weight: bold;">₦${amount.toLocaleString('en-NG')}</td>
            </tr>
          </table>
        </div>

        <h3 style="margin-top: 30px; color: #873e23;">Order Items</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #873e23;">Item</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #873e23;">Qty</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #873e23;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            We'll notify you once your order is ready for shipping/pickup.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you have any questions, please don't hesitate to contact us.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: #873e23; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Continue Shopping</a>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
        <p>This is an automated email. Please do not reply.</p>
        <p>© ${new Date().getFullYear()} Atelier Archives. All rights reserved.</p>
      </div>

    </body>
    </html>
  `;
}

// Send payment confirmation email
export async function sendPaymentConfirmationEmail(data: PaymentConfirmationData) {
  const { to } = data;

  const mailOptions = {
    from: `"Atelier Archives" <${process.env.EMAIL_FROM}>`,
    to,
    subject: `Payment Confirmation - Order #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: generateReceiptHTML(data),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Payment confirmation email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}