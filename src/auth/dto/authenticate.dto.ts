import { IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class AuthenticateDto {

	@IsUUID()
	@IsNotEmpty()
	public userId: string
}
