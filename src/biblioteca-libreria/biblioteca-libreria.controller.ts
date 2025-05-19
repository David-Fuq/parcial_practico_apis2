import { Controller, Post, Param, Body, Get, Put, Delete } from "@nestjs/common";
import { BibliotecaLibreriaService } from "./biblioteca-libreria.service";
import { Libro } from "src/libro/entities/libro.entity";

@Controller('bibliotecas')
export class BibliotecaLibreriaController {
  constructor(private readonly bibliotecaLibreriaService: BibliotecaLibreriaService) {}

  @Post(':bibliotecaId/libros/:libroId')
  async addBookToLibrary(
    @Param('bibliotecaId') bibliotecaId: string,
    @Param('libroId') libroId: string
  ) {
    return this.bibliotecaLibreriaService.addBookToLibrary(bibliotecaId, libroId);
  }

  @Get(':bibliotecaId/libros')
  async findBooksFromLibrary(
    @Param('bibliotecaId') bibliotecaId: string
  ): Promise<Libro[]> {
    return this.bibliotecaLibreriaService.findBooksFromLibrary(bibliotecaId);
  }

  @Get(':bibliotecaId/libros/:libroId')
  async findBookFromLibrary(
    @Param('bibliotecaId') bibliotecaId: string,
    @Param('libroId') libroId: string
  ): Promise<Libro> {
    return this.bibliotecaLibreriaService.findBookFromLibrary(bibliotecaId, libroId);
  }

  @Put(':bibliotecaId/libros')
  async updateBooksFromLibrary(
    @Param('bibliotecaId') bibliotecaId: string,
    @Body() libros: Libro[]
  ) {
    return this.bibliotecaLibreriaService.updateBooksFromLibrary(bibliotecaId, libros);
  }

  @Delete(':bibliotecaId/libros/:libroId')
  async deleteBookFromLibrary(
    @Param('bibliotecaId') bibliotecaId: string,
    @Param('libroId') libroId: string
  ) {
    return this.bibliotecaLibreriaService.deleteBookFromLibrary(bibliotecaId, libroId);
  }
}