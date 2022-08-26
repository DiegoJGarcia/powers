import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import './Power.scss';

import { IPower, usePower } from 'hooks/usePower';

import { Card } from 'components/Card';
import { Number } from 'components/Number';
import { Text } from 'components/Text';
import { handleLabelLevels } from 'common/helpers';
import { CardStatus } from 'common/constants';
import { useComplete } from 'hooks/core/useComplete';

type PowerProps = {
	id: string;
	key: string;
	index: number;
	data: IPower;
	save: (power: IPower) => void;
	remove: (power: IPower) => void;
	adding?: boolean;
};

export const Power: FC<PowerProps> = ({ id, key, index, data, save, remove, adding }) => {
	const [power, setPower] = useState<IPower>(data);

	const [powerStatus, setPowerStatus] = useState<string>('');
	const [labelStatus, setLabelStatus] = useState<string>();

	useEffect(() => {
		const newStatus = handleLabelLevels(power?.level);
		setLabelStatus(newStatus);
	}, [power?.level]);

	const completed = useComplete(power, ['name']);

	const handleChange = (name: string, value: any) => {
		setPower({ ...power, [name]: value });
		setPowerStatus('editing');
	};

	const savePower = async () => {
		try {
			save(power);
		} catch {
			setPowerStatus('error');
		}
		setPowerStatus('');
	};

	return (
		<Card
			key={id}
			className="power"
			id={!adding ? id : 'new-power'}
			status={!adding ? powerStatus : completed ? CardStatus.editing : CardStatus.new}
			onSave={!adding ? savePower : () => save(power)}
			onRemove={() => remove(power)}
		>
			<Text
				firstFocus
				className="values"
				name="name"
				label="Power"
				value={power?.name}
				onChange={e => handleChange(e.target.name, e.target.value)}
				max={44}
				maxWidth={270}
			/>
			<Number
				className="values"
				name="cycles"
				label="Cycles"
				value={power?.name}
				onChange={e => handleChange(e.target.name, e.target.value)}
				max={44}
				maxWidth={270}
			/>
			<b>{labelStatus}</b>
		</Card>
	);
};
