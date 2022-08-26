import { useEffect, useState } from 'react';

type TypeUseThemeResponse = [defaultLight: boolean, switchLight: () => void];

export const useTheme = (defaultStatus = true): TypeUseThemeResponse => {
	const [light, setLight] = useState<boolean>(defaultStatus);

	useEffect(() => {
		const currentStatus: boolean = !!localStorage.getItem('light') || defaultStatus;
		setLight(currentStatus);
		return;
	}, [defaultStatus]);

	const switchLight = () => {
		localStorage.setItem('light', JSON.stringify(!light));
		setLight(!light);
	};

	return [light, switchLight];
};
