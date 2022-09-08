import React, { FC, useEffect, useState } from 'react';
import './Power.scss';

import { IPower, usePower } from 'hooks/usePower';

import { Card } from 'components/Card';
import { NumberField } from 'components/NumberField';
import { TextField } from 'components/TextField';
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
		const canCreate = powerNameValidation(value);
		setPower({ ...power, name: value });
		setPowerStatus(canCreate ? CardStatus.editing : CardStatus.error);
	};

	const handleHitsNeeds = (value: number) => {
		setPower({ ...power, hitsNeeds: value });
		setPowerStatus(CardStatus.editing);
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
			// [TODO] mejorar lógica de estado
			status={
				powerStatus === CardStatus.error
					? CardStatus.error
					: !adding
					? powerStatus
					: completed
					? CardStatus.editing
					: CardStatus.new
			}
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
						<TextField
							firstFocus
							className="values"
							name="name"
							label="Power"
							value={power.name}
							onChange={value => handleName(value)}
							max={44}
							maxWidth={270}
						/>
					</div>
					<div className="power_hits">
						<NumberField
							className="values"
							name="cycles"
							label="Cycles"
							value={power.hitsNeeds}
							onChange={value => handleHitsNeeds(value)}
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
