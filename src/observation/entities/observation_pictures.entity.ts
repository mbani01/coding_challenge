import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import {Observation} from '../entities/observation.entity'
@Entity()
export class ObservationPicture {
	@PrimaryGeneratedColumn('uuid')
	id :string;
	
	@Column()
	picture: string;

	@ManyToOne(()=> Observation, (observation)=>observation.pictures, {onDelete: 'CASCADE'})
	observation: Observation
}