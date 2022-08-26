import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class CreateUserDto {

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	public name: string
}
