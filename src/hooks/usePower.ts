import { useState } from 'react';

export interface IPower {
	id: string;
	name: string;
	level: number;
	cycles: number;
	key: string;
}

interface PowerResponse {
	powers: IPower[];
	updatePowers: (newPower: IPower, action: string) => void;
}

export const usePower = (): PowerResponse => {
	const [powers, setPowers] = useState<IPower[]>([]);

	const updatePowers = async (newPower: IPower, action: string) => {
		const indexToupdate: number = powers.findIndex(p => p.key === newPower.key);

		switch (action) {
			case 'add':
				setPowers(current => [...current, newPower]);

				break;
			case 'update':
				setPowers(current => current.splice(indexToupdate, 1, newPower));

				break;
			case 'remove':
				setPowers(current => current.filter(ps => ps.key !== newPower.key));

				break;

			default:
				break;
		}
	};
	return { powers, updatePowers };
};
