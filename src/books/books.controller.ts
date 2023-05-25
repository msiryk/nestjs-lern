import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import UpdateBookDto from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.findAll();
  }

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    console.log('body', body);
    return this.booksService.create(body);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return this.booksService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.booksService.remove(parseInt(id));
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return this.booksService.findOne(parseInt(id));
  }
}
