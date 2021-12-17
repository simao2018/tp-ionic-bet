export interface JwtPayload {
    email: string;
    id: string;
    credit?: number;

    iat?: number;
    exp?: number;
}