import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"; // Import ExtractJwt

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access_token'){

}