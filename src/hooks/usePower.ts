import { cache } from 'common/container';
import { useEffect, useState } from 'react';
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

	useEffect(() => {
		const cachedPowers: IPower[] | any = cache.get('powers');

		!!cachedPowers && setPowers(cachedPowers);
		!!cachedPowers && console.log('CACHED DATA RESTORED');

		return;
	}, []);

	const powerNameValidation = (powerName: string): boolean => {
		const notDuplicated = !powers?.find(d => d.name === powerName);

		return notDuplicated;
	};

	const savePowers = async (updatedPowers: IPower[]) => {
		await cache.set('powers', updatedPowers);
		setPowers(updatedPowers);

		console.log('POWERS SAVED SUCCESSFULLY');
	};

	const addPower = async (newPower: IPower) => {
		const basePower: IPower = {
			id: `new-power-${powers.length}`,
			name: newPower.name,
			level: 1,
			cycles: 0,
			hits: 0,
			hitsNeeds: 7,
		};

		const updatedPowers = await [...powers, basePower];

		savePowers(updatedPowers);
	};

	const updatePower = async (newPower: IPower) => {
		const indexToupdate: number = await powers.findIndex(p => p.name === newPower.name);
		const updatedPowers = await powers.splice(indexToupdate, 1, newPower);

		savePowers(updatedPowers);
	};

	const removePower = async (powerName: string) => {
		const updatedPowers = await powers.filter(ps => ps.name !== powerName);

		savePowers(updatedPowers);
	};

	return { powers, addPower, updatePower, removePower, powerNameValidation };
};
