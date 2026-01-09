import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
