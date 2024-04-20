import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
