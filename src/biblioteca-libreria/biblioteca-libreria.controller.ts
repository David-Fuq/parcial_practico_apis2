import { Controller } from "@nestjs/common";
import { BibliotecaLibreriaService } from "./biblioteca-libreria.service";

@Controller('librerias')
export class BibliotecaLibreriaController {
  constructor(private readonly bibliotecaLibreriaService: BibliotecaLibreriaService) {}
}