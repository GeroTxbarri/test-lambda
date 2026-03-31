import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {



  async onModuleInit() {
    // Esto despierta la conexión apenas arranca NestJS
    await this.$connect();
  }
}