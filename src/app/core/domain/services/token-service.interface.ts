import { Observable } from "rxjs";
import { FirstConnection } from "../types/first-connection.type";
import { JwtToken } from "../types/jwt-token.type";

export abstract class TokenServiceInterface {
	abstract generateJwtToken(firstConnection?: FirstConnection): Observable<JwtToken>;
}