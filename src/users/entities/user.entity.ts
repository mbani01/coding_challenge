import { Observation } from "src/observation/entities/observation.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({length: 50})
	name: string;

	@OneToMany(()=> Observation, (observation)=>observation.user)
	observations: []
}
