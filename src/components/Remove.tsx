import React, { FC, ReactElement } from 'react';
import './Remove.scss';

interface IRemove {
	onRemove: () => void;
}

export const Remove: FC<IRemove> = ({ onRemove }): ReactElement => {
	return (
		<div className="remove" onClick={onRemove}>
			X
		</div>
	);
};
