import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { Book } from './book.entity';
import { Author } from 'src/author/author.entity';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
