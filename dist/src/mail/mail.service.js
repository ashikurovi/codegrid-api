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
    constructor() {
        this.logger = new common_1.Logger(MailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.MAIL_PORT || 465),
            secure: process.env.MAIL_SECURE !== 'false',
            auth: {
                user: process.env.MAIL_USER || 'codgridbd@gmail.com',
                pass: process.env.MAIL_PASSWORD || 'kkuh hwxk zzeq ojot',
            },
        });
    }
    async sendOrderStatusUpdateEmail(to, orderId, status) {
        try {
            const info = await this.transporter.sendMail({
                from: '"CodeGrid" <codgridbd@gmail.com>',
                to,
                subject: `Order Status Update - #${orderId}`,
                text: `Hello, the status of your order #${orderId} has been updated to: ${status}.`,
                html: `<p>Hello,</p><p>The status of your order <b>#${orderId}</b> has been updated to: <b>${status}</b>.</p><p>Thank you for shopping with us!</p>`,
            });
            this.logger.log(`Email sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending email to ${to}:`, error);
        }
    }
    async sendCustomOrderStatusUpdateEmail(to, customOrderId, status) {
        try {
            const info = await this.transporter.sendMail({
                from: '"CodeGrid" <codgridbd@gmail.com>',
                to,
                subject: `Custom Order Status Update - #${customOrderId}`,
                text: `Hello, the status of your Custom Order #${customOrderId} has been updated to: ${status}.`,
                html: `<p>Hello,</p><p>The status of your Custom Order <b>#${customOrderId}</b> has been updated to: <b>${status}</b>.</p><p>Thank you for shopping with us!</p>`,
            });
            this.logger.log(`Email sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending email to ${to}:`, error);
        }
    }
    async sendAbandonedCartEmail(to, name) {
        try {
            const info = await this.transporter.sendMail({
                from: '"Our Store" <noreply@ourstore.com>',
                to,
                subject: `You left something behind!`,
                text: `Hi ${name || 'there'},\n\nWe noticed you left some items in your cart. Come back and complete your purchase!`,
                html: `<p>Hi ${name || 'there'},</p><p>We noticed you left some items in your cart.</p><p>Come back and complete your purchase before they run out!</p>`,
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