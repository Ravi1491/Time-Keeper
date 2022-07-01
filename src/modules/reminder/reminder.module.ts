import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TodoModule } from '../todo/todo.module';
import { RemainderService } from './reminder.service';

@Module({
  imports: [
    TodoModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.mailtrap.io',
          secure: false,
          auth: {
            user: config.get('SENDER_EMAIL'),
            pass: config.get('SENDER_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [RemainderService]
})
export class RemainderModule {}
