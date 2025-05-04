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

	const endpoint = parser
		.parse(result.data)
		.branches.branch.url.split('/')
		.pop();

	const branchData = await altoApi.get(`branch/${endpoint}/property`, {
		headers: {
			Accept: 'application/xml',
		},
	});

	const dataProperties = parser.parse(branchData.data);

	const propertyList = dataProperties.properties.property;

	const fullPropartyList = await Promise.all(
		propertyList.map(async (el: any) => {
			const data = await altoApi.get(
				`branch/${endpoint}/property/${el.url.split('/').pop()}`,
				{
					headers: {
						Accept: 'application/xml',
					},
				}
			);
			return parser.parse(data.data);
		})
	);

	res.status(200).json(fullPropartyList);
}

export default {
	getTestItem: ctrlWrapper(getTestItem),
};
