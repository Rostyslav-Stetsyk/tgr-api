import { NextFunction, Request, Response } from 'express';
import { tokenPath } from '../config/path';
import fs from 'fs';
import { altoAuthService } from '../services/altoAuthService';
import { addTokenToHeaders } from '../config/altoApi';

export async function altoAuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = await altoAuthService.getToken();
		addTokenToHeaders(token);
		next();
	} catch (error) {
		const token = fs.readFileSync(tokenPath, 'utf8');
		if (!token) return next(error);
		addTokenToHeaders(token);
		next();
	}
}
