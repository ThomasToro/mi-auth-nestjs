import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async sendOtp(phoneNumber: string, message:string) {
    const fromNumber = this.configService.get<string>('TWILIO_SENDER_PHONE_NUMBER');
    message = `Tu código de verificación es ${message}`; 
  
    await this.twilioClient.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber,
    });
  
    return { msg: 'SMS enviado correctamente' };
  }
  
  

  async verifyOtp(phoneNumber: string, code: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    let msg = '';
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: code })
      .then((verification) => (msg = verification.status));
    return { msg: msg };
  }

}
