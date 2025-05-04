import axios from 'axios';
import 'dotenv/config';

export const altoApi = axios.create({
	baseURL: `https://webservices.vebra.com/export/${process.env.ALTO_DATAFEEDID}/v13`,
});

export function addTokenToHeaders(token: string) {
	altoApi.defaults.headers.common['Authorization'] =
		`Basic ${Buffer.from(JSON.parse(token).token).toString('base64')}`;
}
