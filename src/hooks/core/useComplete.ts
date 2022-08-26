import { useEffect, useState } from 'react';

export const useComplete = <T>(item: T | any, condition?: string[]): boolean => {
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		const notCompleted = !condition?.find(name => item[name] === '' || !item[name]);
		setCompleted(notCompleted);
		return;
	}, [item, condition]);

	return completed;
};
