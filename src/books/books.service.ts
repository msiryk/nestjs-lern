import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import UpdateBookDto from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  findAll() {
    return this.repo.find({
      order: {
        title: 'ASC',
      },
    });
  }

  create(item: CreateBookDto) {
    const book = this.repo.create(item);

    return this.repo.save(book);
  }

  async update(id: number, attrs: UpdateBookDto) {
    const book = await this.repo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }

    Object.assign(book, attrs);
    return this.repo.save(book);
  }

  async remove(id: number) {
    const book = await this.repo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }

    return this.repo.remove(book);
  }

  async findOne(id: number) {
    const book = await this.repo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }

    return book;
  }
}
