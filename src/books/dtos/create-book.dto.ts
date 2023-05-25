import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  authorId: number;
}
