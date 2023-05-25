import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateAuthorDto } from './dtos/create-author-dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post()
  async createAuthor(@Body() body: CreateAuthorDto) {
    return this.authorService.create(body);
  }

  @Get()
  async getAuthors() {
    return this.authorService.getAll();
  }
}
