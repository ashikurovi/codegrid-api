"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let MailService = MailService_1 = class MailService {
    escapeHtml(value) {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    constructor() {
        this.logger = new common_1.Logger(MailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'codegridbd@gmail.com',
                pass: 'kkuh hwxk zzeq ojot',
            },
        });
    }
    async sendNewOrderNotification(order) {
        const recipient = process.env.ORDER_NOTIFICATION_EMAIL || 'codegridbd@gmail.com';
        const safe = (value) => String(value ?? 'Not provided')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        const itemRows = (order.items || []).map((item) => `
      <tr><td style="padding:12px;border-bottom:1px solid #e5e7eb">#${safe(item.productId)}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center">${safe(item.quantity)}</td></tr>`).join('');
        try {
            const info = await this.transporter.sendMail({
                from: '"CodeGrid Orders" <codegridbd@gmail.com>',
                to: recipient,
                subject: `New Order Received - #${order.orderId}`,
                text: `New order #${order.orderId} from ${order.customerName || 'Guest'} for ৳${order.totalAmount}.`,
                html: `
          <div style="margin:0;background:#f3f4f6;padding:32px;font-family:Arial,sans-serif;color:#111827">
            <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #d1d5db">
              <div style="background:#111827;color:#fff;padding:24px 28px">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#93c5fd">CodeGrid Orders</div>
                <h1 style="margin:8px 0 0;font-size:28px">New Order Received</h1>
                <p style="margin:8px 0 0;color:#d1d5db">Order #${safe(order.orderId)} is ready for processing.</p>
              </div>
              <div style="padding:28px">
                <div style="display:flex;justify-content:space-between;border-bottom:1px solid #e5e7eb;padding-bottom:18px">
                  <div><div style="font-size:12px;color:#6b7280;text-transform:uppercase">Customer</div><strong>${safe(order.customerName)}</strong><br/><span>${safe(order.customerEmail)}</span><br/><span>${safe(order.customerPhone)}</span></div>
                  <div style="text-align:right"><div style="font-size:12px;color:#6b7280;text-transform:uppercase">Total</div><strong style="font-size:24px;color:#2563eb">৳${safe(order.totalAmount)}</strong></div>
                </div>
                <h2 style="font-size:16px;text-transform:uppercase;letter-spacing:1px;margin:24px 0 10px">Order Details</h2>
                <p style="white-space:pre-line;color:#374151">${safe(order.shippingAddress)}</p>
                <p style="color:#374151">Payment: <strong>${safe(order.paymentMethod)}</strong> &nbsp; Delivery: <strong>${safe(order.deliveryType)}</strong></p>
                <table style="width:100%;border-collapse:collapse;margin-top:18px"><thead><tr style="background:#f9fafb;text-align:left"><th style="padding:12px">Product ID</th><th style="padding:12px;text-align:center">Quantity</th></tr></thead><tbody>${itemRows || '<tr><td colspan="2" style="padding:12px">No item details</td></tr>'}</tbody></table>
                <h2 style="font-size:16px;text-transform:uppercase;letter-spacing:1px;margin:24px 0 10px">Customer Device</h2>
                <p style="font-size:13px;color:#4b5563;line-height:1.7">Device ID: ${safe(order.deviceId)}<br/>Device: ${safe(order.device)}<br/>Location: ${safe(order.location)}</p>
              </div>
              <div style="padding:16px 28px;background:#f9fafb;color:#6b7280;font-size:12px">This notification was generated automatically by CodeGrid.</div>
            </div>
          </div>`,
            });
            this.logger.log(`New order notification sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending new order notification for #${order.orderId}:`, error);
        }
    }
    async sendOrderStatusUpdateEmail(to, orderId, status) {
        const safeStatus = this.escapeHtml(status);
        try {
            const info = await this.transporter.sendMail({
                from: '"CodeGrid" <codegridbd@gmail.com>',
                to,
                subject: `Order Status Update - #${orderId}`,
                text: `Hello, the status of your order #${orderId} has been updated to: ${status}.`,
                html: `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"></head><body style="margin:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#172033"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f7;padding:32px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid #dbe3ef;border-radius:16px;overflow:hidden"><tr><td style="background:#0f172a;padding:28px 32px"><table role="presentation" width="100%"><tr><td style="font-size:13px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#93c5fd">CODEGRID</td><td align="right" style="font-size:12px;color:#94a3b8">ORDER CARE</td></tr></table><h1 style="margin:28px 0 8px;color:#fff;font-size:28px;line-height:1.2">Your order is on the move</h1><p style="margin:0;color:#cbd5e1;font-size:14px">We have a fresh update for order #${orderId}.</p></td></tr><tr><td style="padding:32px"><p style="margin:0 0 8px;color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:1px">Current status</p><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="background:#dbeafe;border:1px solid #93c5fd;border-radius:999px;padding:12px 20px;color:#1d4ed8;font-size:16px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">${safeStatus}</td></tr></table><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px"><tr><td style="padding:20px"><p style="margin:0;color:#64748b;font-size:13px">ORDER NUMBER</p><p style="margin:6px 0 0;font-size:20px;font-weight:bold;color:#0f172a">#${orderId}</p></td><td align="right" style="padding:20px"><span style="display:inline-block;width:10px;height:10px;background:#2563eb;border-radius:50%"></span></td></tr></table><p style="margin:28px 0 0;color:#64748b;font-size:14px;line-height:1.7">We will keep you updated as your order moves forward. Thank you for choosing CodeGrid.</p></td></tr><tr><td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;line-height:1.6">This is an automatic update from CodeGrid.<br><strong style="color:#475569">codegridbd@gmail.com</strong></td></tr></table></td></tr></table></body></html>`,
            });
            this.logger.log(`Email sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending email to ${to}:`, error);
        }
    }
    async sendCustomOrderStatusUpdateEmail(to, customOrderId, status) {
        const safeStatus = this.escapeHtml(status);
        try {
            const info = await this.transporter.sendMail({
                from: '"CodeGrid Custom Orders" <codegridbd@gmail.com>',
                to,
                subject: `Custom Order Status Update - #${customOrderId}`,
                text: `Hello, the status of your Custom Order #${customOrderId} has been updated to: ${status}.`,
                html: `<div style="background:#fff7ed;padding:32px;font-family:Arial,sans-serif;color:#1f2937"><div style="max-width:560px;margin:auto;background:#fff;border:1px solid #fed7aa"><div style="padding:28px;border-bottom:4px solid #f97316"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#ea580c">CodeGrid Custom Studio</div><h1 style="margin:10px 0 0;font-size:26px">Your custom order is moving</h1></div><div style="padding:28px"><p style="font-size:16px">Custom order <strong>#${customOrderId}</strong> has been updated.</p><div style="border-left:4px solid #f97316;background:#ffedd5;padding:16px 20px;font-size:18px;font-weight:bold;text-transform:uppercase;color:#c2410c">${safeStatus}</div><p style="color:#6b7280;margin-top:24px">Our team is handling your request and will contact you if more information is needed.</p></div><div style="background:#fff7ed;padding:16px 28px;color:#9a3412;font-size:12px">Custom orders are made especially for you.</div></div></div>`,
            });
            this.logger.log(`Email sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending email to ${to}:`, error);
        }
    }
    async sendAbandonedCartEmail(to, name) {
        const safeName = this.escapeHtml(name || 'there');
        try {
            const info = await this.transporter.sendMail({
                from: '"CodeGrid Shop" <codegridbd@gmail.com>',
                to,
                subject: `Your CodeGrid cart is waiting`,
                text: `Hi ${name || 'there'},\n\nWe noticed you left some items in your cart. Come back and complete your purchase!`,
                html: `<div style="background:#fefce8;padding:32px;font-family:Arial,sans-serif;color:#1f2937"><div style="max-width:560px;margin:auto;background:#fff;border:1px solid #fde68a"><div style="background:#facc15;padding:28px"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#713f12">CodeGrid Reminder</div><h1 style="margin:10px 0 0;font-size:26px;color:#422006">Your cart is waiting</h1></div><div style="padding:28px"><p style="font-size:17px">Hi ${safeName},</p><p style="color:#4b5563;line-height:1.7">You left a few items in your CodeGrid cart. They are waiting for you to complete your order.</p><a href="https://codegridbd.com/main/checkout" style="display:inline-block;background:#111827;color:#fff;padding:14px 22px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Return to checkout</a></div><div style="padding:16px 28px;background:#fef9c3;color:#854d0e;font-size:12px">Your favorites may not stay available forever.</div></div></div>`,
            });
            this.logger.log(`Abandoned cart email sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending abandoned cart email to ${to}:`, error);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map