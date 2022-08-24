import React, { FC, useEffect, useState } from 'react';
import './TextField.scss';

type TypeTextField = {
	name: string;
	value?: string | number;
	onChange?: (name: string, value: string | number) => void;
	onBlur?: () => void;
	onKeyPress?: () => void;
	justRead?: boolean;
	type?: string;
	label?: string;
	required?: boolean;
	error?: string;
	className?: string;
	min?: number;
	max?: number;
};

export const TextField: FC<TypeTextField> = ({
	name,
	value,
	onChange,
	onBlur,
	onKeyPress,
	justRead,
	label,
	type = 'text',
	required = false,
	error,
	className,
}) => {
	const [innerValue, setInnerValue] = useState<string | number>();
	const [status, setStatus] = useState<string>('default');

	useEffect(() => {
		if (error) {
			setStatus('error');
		} else if (value) {
			type !== 'custom' && setStatus('finish');
		}
	}, [error, value, type]);

	const onValueChange = (event: any) => {
		const { name, value } = event.target;
		onChange && onChange(name, value);
	};

	return (
		<div
			className={
				'TextField' +
				`${status ? ` TextField--${status}` : ''}` +
				` ${justRead ? ' TextField--non-editable' : ''}` +
				`${className ? ` ${className}` : ''}`
			}
		>
			{label && (
				<label htmlFor={name} className="label">
					{`${label}${required ? ' *' : ''} `}
				</label>
			)}
			<input
				className="TextField_typer label"
				name={name}
				value={innerValue || value}
				onChange={onValueChange}
				onBlur={onBlur}
				onKeyPress={onKeyPress}
				readOnly={justRead}
			/>
			{error && <p className="TextField_errors">{error}</p>}
		</div>
	);
};
