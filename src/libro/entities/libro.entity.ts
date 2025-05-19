import { Biblioteca } from 'src/biblioteca/entities/biblioteca.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Libro {
    @PrimaryGeneratedColumn('uuid') //Creates the id
    id: string;

    @Column()
    titulo: string;

    @Column()
    autor: string;

    @Column()
    fecha_publicacion: Date;

    @Column()
    isbn: string;

    @ManyToMany(() => Biblioteca, (biblioteca) => biblioteca.libros)
    bibliotecas: Biblioteca[];
}
