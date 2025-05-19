import { IsString, IsOptional, IsArray, IsUUID, Matches } from 'class-validator';

export class BibliotecaDto {
  @IsString()
  name: string;

  @IsString()
  direccion: string;

  @IsString()
  ciudad: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'hora_apertura must be in HH:mm:ss format' })
  hora_apertura: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'hora_cierre must be in HH:mm:ss format' })
  hora_cierre: string;
}
