import React, { ReactElement } from 'react';
import './App.scss';

import { useTheme } from 'hooks/core/useTheme';
import { IPower, usePower } from 'hooks/usePower';

import Add from 'components/Add';

import { Power } from 'elements/Power';

const App = (): ReactElement => {
	const [light, switchLight] = useTheme();

	const { powers, updatePowers } = usePower();

	const basePower: IPower = {
		id: `new-power-${powers.length}`,
		name: `Power number ${powers.length + 1}`,
		level: 1,
		cycles: 7,
		key: `power-${powers.length}`,
	};

	return (
		<div className={`app ${light ? 'light' : 'dark'}`}>
			<div className="app_title titles" onClick={switchLight}>
				POWEERS
			</div>
			<div className="app_list">
				{powers.map((power: IPower, i: number) => (
					<Power
						id={power.id}
						key={power.key}
						index={i}
						data={power}
						save={(power: IPower) => updatePowers(power, 'update')}
						remove={power => updatePowers(power, 'remove')}
					/>
				))}
				<Add className="app_list_add" onClick={() => updatePowers(basePower, 'add')} />
			</div>
			<div className="app_action codes">
				<h2>POWEERME</h2>
				<p>by DECREIER 2022</p>
			</div>
		</div>
	);
};

export default App;
