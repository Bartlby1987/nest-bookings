import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/ http-exception.filter';

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true
        })
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await app.listen(port);
    console.log(`Server listening on http://localhost:${port}/api`);
}
bootstrap();
