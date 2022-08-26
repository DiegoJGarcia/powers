import { useEffect } from 'react';

export const useDebounceEffect = <T>(method: () => any, deps: T, delay?: number): any => {
	useEffect(() => {
		const handler = setTimeout(() => method(), delay || 2000);

		return () => clearTimeout(handler);
	}, [deps]);
};
