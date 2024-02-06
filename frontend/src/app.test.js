// App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import App from './app'; // Assuming app.jsx exports the App component

describe('App', () => {
  test('renders pincode input and submit button', () => {
    // Render the App component
    render(<App />);
    
    // Assert that the pincode input and submit button are rendered
    expect(screen.getByLabelText('Pincode:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('submits pincode when form is submitted', () => {
    // Render the App component
    render(<App />);
    
    // Simulate typing a pincode in the input field
    fireEvent.change(screen.getByLabelText('Pincode:'), { target: { value: '123456' } });
    
    // Simulate submitting the form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    // Assert that the pincode is logged
    expect(console.log).toHaveBeenCalledWith('Pincode submitted:', '123456');
  });
});
