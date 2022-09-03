import React, { ReactElement, useState } from 'react';
import './App.scss';

import { useTheme } from 'hooks/core/useTheme';
import { IPower, usePower } from 'hooks/usePower';

import Add from 'components/Add';

import { Power } from 'elements/Power';
import { Hit } from 'elements/Hit';
import Themer from 'components/Themer';

const App = (): ReactElement => {
	const [mode, setMode] = useState<string>('PREVIEW');
	const [emptyOne, setEmptyOne] = useState<boolean>(true);

	const [light, switchLight] = useTheme();

	const { powers, addPower, updatePower, removePower } = usePower();

	const changeMode = () => {
		setMode(current => (current === 'PREVIEW' ? 'DETAILED' : 'PREVIEW'));
	};

	const emptyPower: IPower = {
		id: '',
		name: '',
		level: 0,
		cycles: 0,
		hits: 0,
		hitsNeeds: 0,
	};

	const addNewOne = (newCompletedPower: IPower) => {
		addPower(newCompletedPower);
		setEmptyOne(true);
	};

	return (
		<div className={`app ${light ? 'light' : 'dark'}`}>
			<div className="app_title titles">
				POWEERS
				<button onClick={changeMode}>{mode}</button>
				<Themer onClick={switchLight} light={light} />
			</div>
			<div className="app_list">
				{powers.map((power: IPower, i: number) =>
					mode === 'DETAILED' ? (
						<Power
							id={power.id}
							key={power.name}
							index={i}
							data={power}
							save={(power: IPower) => updatePower(power)}
							remove={power => removePower(power.name)}
						/>
					) : (
						<Hit id={power.id} key={power.name} data={power} onClick={() => console.log('HITED')} />
					),
				)}
				{emptyOne ? (
					<Add className="app_list_add" onClick={() => setEmptyOne(false)} />
				) : (
					<Power
						adding
						id="new-empty-power"
						key="new-empty-power"
						index={powers.length + 1}
						data={emptyPower}
						save={(power: IPower) => addNewOne(power)}
						remove={() => setEmptyOne(true)}
					/>
				)}
			</div>
			<div className="app_action codes">
				<h2>POWEERME</h2>
				<p>by DECREIER 2022</p>
			</div>
		</div>
	);
};

export default App;
