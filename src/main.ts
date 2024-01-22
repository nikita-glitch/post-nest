import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(errorHandlerMiddleware.check)
  await app.listen(process.env.PORT, () => console.log(`SERVER STARTED ON PORT ${process.env.PORT}`));  
}
bootstrap();
