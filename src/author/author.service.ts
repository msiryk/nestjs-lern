import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dtos/create-author-dto';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private repo: Repository<Author>) {}

  create(item: CreateAuthorDto) {
    const author = this.repo.create(item);

    return this.repo.save(author);
  }

  getAll() {
    return this.repo.find({
      order: {
        name: 'ASC',
      },
    });
  }
}
