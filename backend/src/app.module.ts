import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { RequirementsModule } from './requirements/requirements.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig), UserModule,
     MailerModule.forRoot({
    transport: {
      service: 'gmail',
      port: 1025,
      ignoreTLS: true,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
    defaults: {
      from: `"Zenmonk" <${process.env.MAIL_USER}>`,
    },

    preview: true,
    template: {
      dir: process.cwd() + '/src/mail/template',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
     MailModule,
     RequirementsModule,
     InstitutionsModule,
     DomainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
