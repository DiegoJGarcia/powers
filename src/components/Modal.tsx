import React, { FC, ReactElement } from 'react';
import './Modal.scss';

type ModalProps = {
	title?: string;
	open?: boolean;
	children?: ReactElement | string | number;
};

export const Modal: FC<ModalProps> = ({ title, open = false, children }) => {
	return (
		<div className={`modal ${open && 'modal--open'}`}>
			<h2 className="modal_title title">{title}</h2>
			<div className="modal_body">{children}</div>
		</div>
	);
};
