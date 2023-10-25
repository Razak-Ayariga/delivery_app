import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { dbConnection } from './database/dbConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // dbConnection.connect();
  
  await app.listen(3000);
}
bootstrap();
