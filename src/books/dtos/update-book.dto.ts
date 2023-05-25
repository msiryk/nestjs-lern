import { IsString, IsOptional } from 'class-validator';

export default class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;
}
