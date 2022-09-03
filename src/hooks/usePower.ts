import { useState } from 'react';
export interface IPower {
	id: string;
	name: string;
	level: number;
	cycles: number;
	hits: number;
	hitsNeeds: number;
}

interface PowerResponse {
	powers: IPower[];
	addPower: (newPower: IPower) => void;
	updatePower: (newPower: IPower) => void;
	removePower: (powerName: string) => void;
	powerNameValidation: (powerName: string) => boolean;
}

export const usePower = (): PowerResponse => {
	const [powers, setPowers] = useState<IPower[]>([]);

	const powerNameValidation = (powerName: string): boolean => {
		const notDuplicated = !powers?.find(d => d.name === powerName);

		return notDuplicated;
	};

	const addPower = (newPower: IPower) => {
		const basePower: IPower = {
			id: `new-power-${powers.length}`,
			name: newPower.name,
			level: 1,
			cycles: 0,
			hits: 0,
			hitsNeeds: 7,
		};

		setPowers(current => [...current, basePower]);
	};

	const updatePower = (newPower: IPower) => {
		const indexToupdate: number = powers.findIndex(p => p.name === newPower.name);

		setPowers(current => current.splice(indexToupdate, 1, newPower));
	};

	const removePower = (powerName: string) => {
		setPowers(current => current.filter(ps => ps.name !== powerName));
	};

	return { powers, addPower, updatePower, removePower, powerNameValidation };
};
