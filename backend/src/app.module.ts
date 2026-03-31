import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactosModule } from './contactos/contactos.module';

@Module({
  imports: [PrismaModule, ContactosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
