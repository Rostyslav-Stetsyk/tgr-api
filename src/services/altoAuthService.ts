import { altoApi } from '../config/altoApi';
import fs from 'fs';
import { tokenPath } from '../config/path';

export const altoAuthService = {
	async getToken() {
		const auth = Buffer.from(
			`${process.env.ALTO_USERNAME}:${process.env.ALTO_PASSWORD}`
		).toString('base64');

		const result = await altoApi.get('/branch', {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		});

		const token = result.headers['token'];
		const data = JSON.stringify({ token }, null, 2);

		fs.writeFileSync(tokenPath, data, 'utf8');
		return token;
	},
};
