import React, { FC, ReactElement, useId } from 'react';

import './Card.scss';

export type TCardProps = {
	// specific props
	title?: string;
	status?: string;
	onClick?: () => void;
	// common props
	className?: string;
	children?: ReactElement | any;
	// drag and drop support, you need wrapp cards with <DDContainer> [TODO]
};

const Card: FC<TCardProps> = ({ title, status, onClick, className, children }): ReactElement => {
	const id = useId();

	return (
		<div
			id={`${title}-${id}`}
			className={`card${className ? ` ${className}` : ''}${
				status || status === '' ? ` card--${status}` : ''
			}`}
			onClick={onClick}
		>
			<div className="card_data">{children}</div>
			{title && <div className="card_title subtitles">{title?.toUpperCase()}</div>}
		</div>
	);
};

export default Card;
