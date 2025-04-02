import { Body, Controller, Get, Post } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Get()
  getHello(): string {
    return this.smsService.getHello();
  }

  /*
  @Post('/SendOtp')
  async sendOtp(@Body() data: { phone: string ): Promise<any> {
    let phone = data.phone.startsWith('+') ? data.phone : '+57' + data.phone;
    return await this.smsService.sendOtp(phone);
  }



  @Post('/VerifyOtp')
  async verifyOtp(
    @Body() data: { phone: string; otp: string },): Promise<{ msg: string }> {
    let prefix = '+57';
    let phone = prefix.concat(data.phone);
    return await this.smsService.verifyOtp(phone, data.otp);
  }
    */

}