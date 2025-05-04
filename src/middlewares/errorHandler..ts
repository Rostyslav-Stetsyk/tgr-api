import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof AxiosError) {
		if (err.response?.data) {
			res.status(err.response.status).send(err.response.data);
			return;
		} else {
			res.status(err.status || 500).json({
				message: err.message || 'Axios error',
			});
			return;
		}
	}
	res.status(500).json({ message: err.message });
};

export default errorHandler;
