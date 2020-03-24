import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://harshal2:IZQusWYew3mAHP9l@cluster0-ndxxr.mongodb.net/nestjs?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
