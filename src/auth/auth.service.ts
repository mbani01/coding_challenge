import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {

	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
		)
	{}

	async authenticate(userId: string) {
		const user = await this.usersService.findOne(userId);
		if (user)
		{
			const api_key = await this.jwtService.sign({id: userId});
			return {api_key};
		}
	  }
}
