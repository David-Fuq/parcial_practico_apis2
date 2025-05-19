import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    return null;
  }

  @Get()
  findAll() {
    return null;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return null;
  }
}
