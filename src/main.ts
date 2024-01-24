import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { custonExceptionFilter } from './exceptionFilter/exception.filter';

const corsOptions = {
  origin: ''
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT, () => console.log(`SERVER STARTED ON PORT ${process.env.PORT}`));  
  
}
bootstrap();
