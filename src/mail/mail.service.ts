import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
     
      auth: {
        user: 'codegridbd@gmail.com',
        pass:'kkuh hwxk zzeq ojot',
      },
    });
  }

  async sendOrderStatusUpdateEmail(to: string, orderId: number, status: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"CodeGrid" <codgridbd@gmail.com>',
        to,
        subject: `Order Status Update - #${orderId}`,
        text: `Hello, the status of your order #${orderId} has been updated to: ${status}.`,
        html: `<p>Hello,</p><p>The status of your order <b>#${orderId}</b> has been updated to: <b>${status}</b>.</p><p>Thank you for shopping with us!</p>`,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}:`, error);
    }
  }

  async sendCustomOrderStatusUpdateEmail(to: string, customOrderId: number, status: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"CodeGrid" <codgridbd@gmail.com>',
        to,
        subject: `Custom Order Status Update - #${customOrderId}`,
        text: `Hello, the status of your Custom Order #${customOrderId} has been updated to: ${status}.`,
        html: `<p>Hello,</p><p>The status of your Custom Order <b>#${customOrderId}</b> has been updated to: <b>${status}</b>.</p><p>Thank you for shopping with us!</p>`,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}:`, error);
    }
  }

  async sendAbandonedCartEmail(to: string, name: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Our Store" <noreply@ourstore.com>',
        to,
        subject: `You left something behind!`,
        text: `Hi ${name || 'there'},\n\nWe noticed you left some items in your cart. Come back and complete your purchase!`,
        html: `<p>Hi ${name || 'there'},</p><p>We noticed you left some items in your cart.</p><p>Come back and complete your purchase before they run out!</p>`,
      });
      this.logger.log(`Abandoned cart email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Error sending abandoned cart email to ${to}:`, error);
    }
  }
}
