import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';


export class CreateObservationDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	public name: string

	@IsString()
	@IsNotEmpty()
	public description: string

}
