import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders POWEERS title', () => {
	render(<App />);
	const linkElement = screen.getByText(/POWEERS/i);
	expect(linkElement).toBeInTheDocument();
});
