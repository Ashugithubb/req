import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
 constructor(private readonly mailerService: MailerService) { }
  async sendRequirementMail(dto: CreateMailDto): Promise<void> {
  try {
    await this.mailerService.sendMail({
      to: dto.email,
      from: process.env.MAIL_USER,
      subject: 'Requirement Added Successfully ',
      template: './req', 
      context: {
        name: dto.name,               
        requirementName: dto.title,   
        description: dto.description,  
        institution: dto.institution,  
        priority: dto.priority,       
        impact: dto.impact,          
        year: new Date().getFullYear(),
      },
    });
    console.log('Requirement email sent successfully to', dto.email);
  } catch (error) {
    console.error('Failed to send requirement email:', error);
  }
}

  
}
