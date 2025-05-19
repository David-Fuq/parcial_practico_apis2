import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { LibroModule } from './libro/libro.module';
import { BibliotecaLibreriaModule } from './biblioteca-libreria/biblioteca-libreria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from './biblioteca/entities/biblioteca.entity';
import { Libro } from './libro/entities/libro.entity';

@Module({
  imports: [BibliotecaModule, LibroModule, BibliotecaLibreriaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcialApis',
      entities: [Biblioteca, Libro],
      dropSchema: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
