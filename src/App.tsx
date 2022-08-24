import React, { ReactElement, useState } from 'react';
import './App.scss';

import { useTheme } from 'hooks/useTheme';

import arrow from 'assets/arrow.svg';

import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Form } from 'components/Form';
import { Remove } from 'components/Remove';
import { Modal } from 'components/Modal';

const powerInputs = [
	{
		name: 'name',
		label: 'Name',
		check: {
			required: true,
			max: 42,
			min: 1,
		},
	},
	{
		name: 'cycles',
		label: 'Cycles count',
		type: 'number',
		max: 7,
		min: 2,
		check: {
			required: true,
			max: 1,
		},
	},
];

interface IPower {
	name: string;
	cycles: number;
	key: string;
}
const App = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [modal, setModal] = useState<boolean>(false);
	const [powers, setPowers] = useState<IPower[]>([]);

	const addPower = (newPower: IPower) => {
		setModal(false);
		setPowers([...powers, newPower]);
	};

	const removePower = (keyToremove: string) => {
		setPowers(current => current.filter(ps => ps.key !== keyToremove));
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
						<Remove onRemove={() => removePower(power.key)} />
					</Card>
				))}
			</div>
			<div className="app_action">
				<Button type="secondary" onClick={() => setModal(true)}>
					Nuevo poder
				</Button>
			</div>
			<Modal open={modal}>
				<Form
					submitLabel="Add Power"
					onSubmit={power =>
						addPower({
							key: `${power.name} ${power.cycles}`,
							name: power.name,
							cycles: power.cycles,
						})
					}
					inputs={powerInputs}
				/>
			</Modal>
		</div>
	);
};

export default App;
