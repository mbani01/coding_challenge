import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity"
import {ObservationPicture} from './observation_pictures.entity'
@Entity()
export class Observation {
	@PrimaryGeneratedColumn('uuid')
	id :string;

	@Column()
	name: string;

	@Column()
	description: string;
	
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  	public created_at: Date

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updated_at: Date;

	@ManyToOne(() => User, (user)=>user.observations, {onDelete: 'CASCADE'})
	user: User

	@OneToMany(()=> ObservationPicture, (picture)=> picture.observation, {cascade: true})
	pictures : []
}
