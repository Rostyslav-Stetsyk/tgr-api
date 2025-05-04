import { Request, Response } from 'express';
import { altoApi } from '../config/altoApi';
import ctrlWrapper from '../utils/ctrlWrapper';
import { XMLParser } from 'fast-xml-parser';
const parser = new XMLParser();

async function getTestItem(req: Request, res: Response) {
	const result = await altoApi.get('branch', {
		headers: {
			Accept: 'application/xml',
		},
	});

	const json = parser.parse(result.data);

	res.status(200).json(json);
}

export default {
	getTestItem: ctrlWrapper(getTestItem),
};
