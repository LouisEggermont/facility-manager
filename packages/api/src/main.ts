import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000)
  console.info(`Server is running on: ${await app.getUrl()}`)
}
bootstrap().catch(err => {
  console.error('Error during bootstrap:', err)
})
