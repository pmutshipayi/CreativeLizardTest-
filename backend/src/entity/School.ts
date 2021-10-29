import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    imageLink: string;
}