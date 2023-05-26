import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import UpdateBookDto from './dtos/update-book.dto';
import { Author } from 'src/author/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}

  findAll() {
    return this.bookRepo.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async create(item: CreateBookDto) {
    let author = item.author;
    if (item.authorId) {
      const authorItem = await this.authorRepo.findOneBy({ id: item.authorId });
      if (!authorItem) {
        throw new NotFoundException('Author is not found, wrong authorId');
      }
      author = authorItem.name;
    }

    const book = this.bookRepo.create({ ...item, author });

    return this.bookRepo.save(book);
  }

  async update(id: number, attrs: UpdateBookDto) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }

    Object.assign(book, attrs);
    return this.bookRepo.save(book);
  }

  async remove(id: number) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }

    return this.bookRepo.remove(book);
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }

    return book;
  }
}
