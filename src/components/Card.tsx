import React, { FC, ReactElement, useRef } from 'react';
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
	noEditable?: boolean;
	noRemove?: boolean;
	onPick?: () => void;
	onDrag?: () => void;
	onDrop?: () => void;
	order?: any;
	data?: any;
};

export const Card: FC<CardProps> = ({
	id,
	status = '',
	children,
	className,
	onClick,
	onSave,
	onRemove,
	draggable,
	noRemove = false,
	onPick,
	onDrag,
	onDrop,
	order,
	data,
}) => {
	const draggingCard = useRef<any>(null);
	const draggingBase = useRef<any>(null);

	useDebounceEffect(() => data && enter(), data);

	const enter = async () => {
		return onSave && onSave();
	};

	const draggStart = (e: any) => {
		draggingBase.current = e.target;
		draggingBase.current.style = 'opacity: 0; transition: .1s';
		draggingBase.current.addEventListener('draggEnd', draggEnd);

		draggingCard.current = children;

		return onPick && onPick();
	};

	const draggEnd = () => {
		draggingCard.current = null;
		draggingBase.current.removeEventListener('draggEnd', draggEnd);
		draggingBase.current.style = '';
		draggingBase.current = null;

		return onDrop && onDrop();
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
			draggable={draggable}
			onDragStart={draggStart}
			onDragOver={onDrag}
			onDragEnd={draggEnd}
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
			{status !== '' &&
				(status === CardStatus.editing ? (
					<div className="card_label card_label--save" onClick={enter}>
						Guardar
					</div>
				) : (
					<div className="card_label">{status === CardStatus.new ? 'Faltan datos' : 'Error'}</div>
				))}
		</div>
	);
};
