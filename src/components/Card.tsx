import React, { FC, ReactElement } from 'react';
import './Card.scss';

import remove from 'assets/error.svg';
import { useDebounceEffect } from 'hooks/core/useDebounce';
import { CardStatus } from 'common/constants';

type CardProps = {
	id?: string | number;
	children?: ReactElement | ReactElement[] | string | number;
	status?: string;
	className?: string;
	draggable?: boolean;
	onClick?: () => void;
	onSave?: () => void;
	onRemove?: () => void;
	noRemove?: boolean;
	order?: number;
	data?: unknown;
};

export const Card: FC<CardProps> = ({
	id,
	status = '',
	children,
	className,
	onClick,
	onSave,
	onRemove,
	noRemove = false,
	order,
	data,
}) => {
	useDebounceEffect(() => data && enter(), data);

	const enter = () => {
		return onSave && onSave();
	};

	return (
		<div
			onKeyPress={e => e.key === 'Enter' && enter()}
			className={
				'card' +
				`${className ? ` ${className}` : ''}` +
				`${status ? ` card--${status}` : ''}` +
				`${order ? ' card_showOrder' : ''}`
			}
			onClick={e => {
				e.stopPropagation();
				onClick && onClick();
			}}
			key={id}
		>
			{!noRemove && !order && (
				<img
					draggable={false}
					className="card_close"
					onClick={e => {
						e.stopPropagation();
						onRemove && onRemove();
					}}
					src={remove}
					alt="delete_button"
				/>
			)}
			{order && (
				<div className="card_showOrder_container">
					<p className="card_showOrder_order">{order}</p>
				</div>
			)}
			{children}
			{status === CardStatus.editing ? (
				<div className="card_label card_label--save" onClick={enter}>
					Guardar
				</div>
			) : (
				<div className="card_label">
					{status === CardStatus.new
						? 'Faltan datos'
						: status === CardStatus.error
						? 'Este nombre ya existe'
						: ''}
				</div>
			)}
		</div>
	);
};
