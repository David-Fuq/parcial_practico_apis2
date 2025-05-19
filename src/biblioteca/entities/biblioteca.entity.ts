import { Libro } from 'src/libro/entities/libro.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Biblioteca {
    @PrimaryGeneratedColumn('uuid') //Creates the id
    id: string;

    @Column()
    name: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column({ type: 'time' })
    hora_apertura: string;

    @Column({ type: 'time' })
    hora_cierre: string;

    @ManyToMany(() => Libro, (libro) => libro.bibliotecas)
    @JoinTable()
    libros: Libro[];
}
