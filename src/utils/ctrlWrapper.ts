import { AxiosError } from 'axios';

const ctrlWrapper = (fn: Function) => {
	return async (req: any, res: any, next: any) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export default ctrlWrapper;
