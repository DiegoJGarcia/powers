import React, { FC, useEffect, useState } from 'react';
import './Power.scss';

import { IPower, usePower } from 'hooks/usePower';

import { Card } from 'components/Card';
import { Number } from 'components/Number';
import { Text } from 'components/Text';
import { handleLevelLabel } from 'common/helpers';
import { CardStatus } from 'common/constants';
import { useComplete } from 'hooks/core/useComplete';

type TPowerProps = {
	id: string;
	key: string;
	index: number;
	data: IPower;
	save: (power: IPower) => void;
	remove: (power: IPower) => void;
	adding?: boolean;
};

export const Power: FC<TPowerProps> = ({ id, key, data, save, remove, adding }) => {
	const { powerNameValidation } = usePower();

	const [power, setPower] = useState<IPower>(data);

	const [powerStatus, setPowerStatus] = useState<string>('');
	const [levelLabel, setLevelLabel] = useState<string>();

	useEffect(() => {
		const newStatus = handleLevelLabel(power?.level);
		setLevelLabel(newStatus);
	}, [power?.level]);

	const completed = useComplete(power, ['name', 'hitsNeeds']);

	const handleName = (value: string) => {
		powerNameValidation(value);
		setPower({ ...power, name: value });
		setPowerStatus('editing');
	};

	const handleHitsCount = (value: number) => {
		setPower({ ...power, hitsNeeds: value });
		setPowerStatus('editing');
	};

	const savePower = () => {
		try {
			save(power);
		} catch {
			setPowerStatus('error');
		}
		setPowerStatus('');
	};

	return (
		<Card
			className="power"
			id={!adding ? id : 'new-power'}
			key={key}
			status={!adding ? powerStatus : completed ? CardStatus.editing : CardStatus.new}
			onSave={!adding ? savePower : () => save(power)}
			onRemove={() => remove(power)}
		>
			{!adding ? (
				<>
					<div className="power_level">{levelLabel}</div>
					<div className="power_hits">{power?.hits}</div>
					<div className="power_timer">timer</div>
				</>
			) : (
				<>
					<div className="power_level">
						<Text
							firstFocus
							className="values"
							name="name"
							label="Power"
							value={power?.name}
							onChange={e => handleName(e.target.value)}
							max={44}
							maxWidth={270}
						/>
					</div>
					<div className="power_hits">
						<Number
							className="values"
							name="cycles"
							label="Cycles"
							value={power?.name}
							onChange={e => handleHitsCount(e.target.value)}
							max={44}
							maxWidth={270}
						/>
					</div>
					<div className="power_timer">timer</div>
				</>
			)}
		</Card>
	);
};
