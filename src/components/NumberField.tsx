/* eslint-disable @typescript-eslint/no-explicit-any */
import { regex } from 'common/constants';
import React, { FC, useEffect, useRef, useState } from 'react';

import './NumberField.scss';

type NumberFieldProps = {
	name: string;
	label?: string;
	value?: number;
	placeholder?: string;
	readOnly?: boolean;
	onBlur?: () => void;
	onClick?: () => void;
	onChange?: (value: number) => void;
	max?: number;
	className?: string;
	align?: string;
	prefix?: string;
	suffix?: string;
	showFix?: boolean;
	inputmode?: 'numeric' | 'decimal' | undefined;
	maxWidth?: number;
	firstFocus?: boolean;
};

export const NumberField: FC<NumberFieldProps> = ({
	name,
	value,
	onChange,
	readOnly,
	placeholder,
	max = 24,
	className,
	align = 'center',
	prefix,
	suffix,
	showFix,
	label,
	inputmode = 'numeric',
	onClick,
	onBlur,
	maxWidth,
	firstFocus,
}) => {
	const [number, setNumber] = useState<number>();

	const numberRef = useRef<any>();

	useEffect(() => {
		firstFocus && numberRef.current.focus();
		numberRef.current.style.height = '0px';
		const scrollHeight = numberRef.current.scrollHeight;
		numberRef.current.style.height = scrollHeight + 'px';

		return;
	}, [value, number, firstFocus]);

	const innerValidChange = (e: Record<string, any>) => {
		const newValue = Number(e.target.value);
		const isNumber = regex.numeric.test(e.target.value);
		setNumber(newValue);
		return isNumber && onChange && onChange(newValue);
	};

	return (
		<div className="number" onClick={onClick} onBlur={onBlur} style={{ maxWidth: maxWidth + 'px' }}>
			{label && (
				<label className={'number_label label' + `${align ? ` number_label--${align}` : ''}`}>
					{label}
				</label>
			)}
			<div className="number_input">
				{(showFix || (value && prefix)) && <div className="ref number--extra">{prefix}</div>}
				<textarea
					inputMode={inputmode}
					ref={numberRef}
					name={name}
					className={
						'number_area' +
						`${readOnly ? ' number_area--non-editable' : ''}` +
						`${className ? ` ${className}` : ''}` +
						`${align ? ` number_area--${align}` : ''}`
					}
					onKeyPress={e => e.key === 'Enter' && numberRef.current.blur()}
					placeholder={placeholder || name}
					onChange={innerValidChange}
					spellCheck={false}
					readOnly={readOnly}
					value={value ? value : number}
					maxLength={max}
				/>
				{(showFix || (value && suffix)) && <div className="ref number--extra">{suffix}</div>}
			</div>
		</div>
	);
};
