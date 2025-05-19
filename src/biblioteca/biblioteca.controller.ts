import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaDto } from './dto/biblioteca.dto';
import { Biblioteca } from './entities/biblioteca.entity';
import { plainToInstance } from 'class-transformer';

@Controller('bibliotecas')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Post()
  async create(@Body() bibliotecaDto: BibliotecaDto) {
    const biblioteca : Biblioteca = plainToInstance(Biblioteca, bibliotecaDto);
    return await this.bibliotecaService.create(biblioteca);
  }

  @Get()
  async findAll() {
    return await this.bibliotecaService.findAll();
  }

  @Get(':bibliotecaId')
  async findOne(@Param('bibliotecaId') bibliotecaId: string) {
    return await this.bibliotecaService.findOne(bibliotecaId);
  }

  @Put(':bibliotecaId')
  async update(@Param('bibliotecaId') bibliotecaId: string, @Body() bibliotecaDto: BibliotecaDto) {
    const biblioteca : Biblioteca = plainToInstance(Biblioteca, bibliotecaDto);
    return await this.bibliotecaService.update(bibliotecaId, biblioteca);
  }

  @Delete(':bibliotecaId')
  @HttpCode(204)
  async delete(@Param('bibliotecaId') bibliotecaId: string) {
    return await this.bibliotecaService.delete(bibliotecaId);
  }
}
