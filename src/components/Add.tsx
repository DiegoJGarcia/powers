import React, { FC } from 'react';
import add from 'assets/add.svg';

import './Add.scss';

type AddProps = {
	onClick: () => void;
	disabled?: boolean;
	className?: string;
};

const Add: FC<AddProps> = ({ onClick, disabled, className }) => {
	return (
		<div className={`add${className ? ` ${className}` : ''}`}>
			<button className="add_button" onClick={onClick} disabled={disabled}>
				<img src={add} alt="add-button" />
			</button>
		</div>
	);
};

export default Add;
