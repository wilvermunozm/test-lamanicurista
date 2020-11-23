import { NestFactory } from '@nestjs/core';
import { from } from 'rxjs';
import { AppModule } from './app.module';
require('dotenv').config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin:process.env.FRONTEND_URI,
  })
  console.log("Port -> " + process.env.PORT )
  await app.listen(process.env.PORT);
}
bootstrap();
