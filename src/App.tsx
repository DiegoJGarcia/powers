import React, { ReactElement, useState } from 'react';
import './App.scss';

import { useTheme } from 'hooks/useTheme';

import Button from 'components/Button';
import arrow from 'assets/arrow.svg';
import Card from 'components/Card';
import { Remove } from 'components/Remove';

interface IPower {
	name: string;
}
const App = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [powers, setPowers] = useState<IPower[]>([]);

	const addPower = (newPower: string) => {
		setPowers([...powers, { name: newPower }]);
	};

	const removePower = (toremovePower: string) => {
		const newPowerList: IPower[] = powers;

		const index: number = powers.findIndex((n: IPower) => n.name === toremovePower);

		newPowerList.splice(index, 1);

		setPowers([...newPowerList]);
		return;
	};

	return (
		<div className={`app ${light ? 'light' : 'dark'}`}>
			<div className="app_title titles" onClick={switchLight}>
				POWERS PWA
			</div>
			<div className="app_list">
				{powers.map((power: IPower) => (
					<Card className="app_list_item" key={power.name}>
						<h2>{power.name}</h2>
						<Remove onRemove={() => removePower(power.name)} />
					</Card>
				))}
			</div>
			<div className="app_action">
				<Button type="primary" onClick={() => addPower(`Power ${powers.length + 1}`)} icon={arrow}>
					New Power
				</Button>
			</div>
		</div>
	);
};

export default App;
