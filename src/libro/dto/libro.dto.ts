import { IsString, IsUUID, IsDateString, IsOptional, IsArray } from 'class-validator';

export class LibroDto {
    @IsString()
    titulo: string;

    @IsString()
    autor: string;

    @IsDateString()
    fecha_publicacion: Date;

    @IsString()
    isbn: string;
}
