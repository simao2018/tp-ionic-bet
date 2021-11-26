import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { API_PORT } from '../tools/config';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({ origin: ['http://localhost:4200'], credentials: true })

  const config = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('Template Web API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, config);

  app.use('/api/docs/swagger.json', (req: any, res: any) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('swagger', app, null, {
    swaggerUrl: `/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  })

  await app.listen(API_PORT);
}
bootstrap();
