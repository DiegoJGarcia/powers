/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from 'react';

import './TextField.scss';

type TextFieldProps = {
	name: string;
	label?: string;
	value?: string;
	placeholder?: string;
	readOnly?: boolean;
	onBlur?: () => void;
	onClick?: () => void;
	onChange?: (value: string) => void;
	max?: number;
	className?: string;
	align?: string;
	prefix?: string;
	suffix?: string;
	showFix?: boolean;
	inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | undefined;
	maxWidth?: number;
	firstFocus?: boolean;
};

export const TextField: FC<TextFieldProps> = ({
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
	inputmode = 'text',
	onClick,
	onBlur,
	maxWidth,
	firstFocus,
}) => {
	const [text, setText] = useState<string>('');

	const textRef = useRef<any>();

	useEffect(() => {
		firstFocus && textRef.current.focus();
		textRef.current.style.height = '0px';
		const scrollHeight = textRef.current.scrollHeight;
		textRef.current.style.height = scrollHeight + 'px';

		return;
	}, [value, text, firstFocus]);

	const innerChange = (e: Record<string, any>) => {
		const newValue = String(e.target.value);
		setText(newValue);
		onChange && onChange(newValue);
	};

	return (
		<div className="text" onClick={onClick} onBlur={onBlur} style={{ maxWidth: maxWidth + 'px' }}>
			{label && (
				<label className={'text_label label' + `${align ? ` text_label--${align}` : ''}`}>
					{label}
				</label>
			)}
			<div className="text_input">
				{(showFix || (value && prefix)) && <div className="ref text--extra">{prefix}</div>}
				<textarea
					inputMode={inputmode}
					ref={textRef}
					name={name}
					className={
						'text_area' +
						`${readOnly ? ' text_area--non-editable' : ''}` +
						`${className ? ` ${className}` : ''}` +
						`${align ? ` text_area--${align}` : ''}`
					}
					onKeyPress={e => e.key === 'Enter' && textRef.current.blur()}
					placeholder={placeholder || name}
					onChange={innerChange}
					spellCheck={false}
					readOnly={readOnly}
					value={value && value !== '' ? value : text}
					maxLength={max}
				/>
				{(showFix || (value && suffix)) && <div className="ref text--extra">{suffix}</div>}
			</div>
		</div>
	);
};
