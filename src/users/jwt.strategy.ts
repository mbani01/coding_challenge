import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

function getJwtFromParam(req): string {
	if (!req.query.api_key) return '';
	const token = req.query.api_key
	return token;
  }


export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([getJwtFromParam]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: any) {
        return {userId: payload.id}
    }

	

}