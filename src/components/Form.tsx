import React, { FC, useEffect, useState } from 'react';
import './Form.scss';

import arrow from 'assets/arrow.svg';

import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { Button } from './Button';

type TypeCheck = {
	required?: boolean;
	min?: number;
	max?: number;
	regex?: RegExp;
};

type TypeInputObject = {
	name: string;
	value?: any;
	onChange?: (name: string, value: string | number) => void;
	type?: string;
	label?: string;
	check?: TypeCheck;
	min?: number;
	max?: number;
};

type TypeForm = {
	submitLabel?: string;
	onSubmit?: (e: any) => void;
	inputs?: TypeInputObject[];
	bottom?: any;
	async?: boolean;
};

export const Form: FC<TypeForm> = ({
	submitLabel = ' Aceptar',
	onSubmit,
	inputs = [],
	bottom,
	async = false,
}) => {
	const [progress, setProgress] = useState<number>(0);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [values, setValues] = useState<Record<string, string | number>>({});

	useEffect(() => {
		let start = {};
		inputs.map(input => input.value && (start = { ...start, [input.name]: input.value }));
		setValues(start);
		return;
	}, []);

	useEffect(() => {
		handleProgress();
	}, [values, errors]);

	const handleProgress = () => {
		const inputsRate = 100 / inputs.length;
		const valuesRate = Object.values(values).length * inputsRate;
		const errorsRate = Object.values(errors).length * inputsRate;

		const finalRate = valuesRate - errorsRate;
		const currentProgress = finalRate < 0 ? 0 : finalRate > 100 ? 100 : finalRate;

		setProgress(currentProgress);
	};

	const validate = (name: string, check?: TypeCheck, label?: string, value?: any) => {
		const req = `Necesitamos saber tu ${label}`;
		const minL = `Tu ${label} debe tener al menos ${check?.min} caracteres`;
		const maxL = `Tu ${label} no debe superar los ${check?.max} caracteres`;
		const regE = `Debe tener formato de email válido`;

		const err: Record<string, any> = { [name]: null };

		if (check?.min && value?.length < check.min) {
			err[name] = minL;
		}

		if (check?.max && value?.length > check.max) {
			err[name] = maxL;
		}

		if (check?.regex) {
			const validEmail = check.regex.test(value);
			!validEmail && (err[name] = regE);
		}

		if (check?.required && (value === '' || !value)) {
			err[name] = req;
		}

		const finalErrors = !err[name] && !errors.length ? {} : { ...errors, ...err };

		return setErrors(finalErrors);
	};

	const handleChange = (
		name: string,
		value: string | number,
		check?: TypeCheck,
		label?: string,
	) => {
		errors[name] && validate(name, check, label, value);
		setValues({ ...values, [name]: value });
	};

	const submiting = async () => {
		if (onSubmit) {
			await onSubmit(values);
		}
	};

	return (
		<div className="form">
			<div className="form_progress label">
				{progress !== 100
					? progress > 50 && progress < 100
						? 'Solo un poco mas'
						: 'Empecemos'
					: '¡Bienvenido!'}
				<div className="form_progress_bar">
					<div className="form_progress_bar--layer" style={{ width: `${progress}%` }} />
				</div>
			</div>
			<div className="form_inputs">
				{inputs &&
					inputs.map((inp, index) =>
						inp.type === 'number' ? (
							<NumberField
								key={index}
								name={inp.name}
								value={values[inp.name]}
								onChange={(name, value) => handleChange(name, value, inp.check, inp.label)}
								onBlur={() =>
									inp.check && validate(inp.name, inp.check, inp.label, values[inp.name])
								}
								min={inp.min}
								max={inp.max}
								type={inp.type}
								label={inp.label}
								required={inp.check?.required}
								error={errors[inp.name]}
							/>
						) : (
							<TextField
								key={index}
								name={inp.name}
								value={values[inp.name]}
								onChange={(name, value) => handleChange(name, value, inp.check, inp.label)}
								onBlur={() =>
									inp.check && validate(inp.name, inp.check, inp.label, values[inp.name])
								}
								type={inp.type}
								label={inp.label}
								required={inp.check?.required}
								error={errors[inp.name]}
							/>
						),
					)}
			</div>
			<div className="form_button">
				{onSubmit && (
					<Button
						type="primary"
						onClick={submiting}
						icon={arrow}
						async={async}
						disabled={
							!!Object.values(errors).length ||
							inputs.length !== Object.values(values).length ||
							progress !== 100
						}
					>
						{submitLabel}
					</Button>
				)}
			</div>
			<div className="form_bottom">{bottom}</div>
		</div>
	);
};
