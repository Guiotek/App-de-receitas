import { act, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithContext from './renderWithContext';

describe('Implementa testes na tela de Login', () => {
  test('Testa elementos na tela', () => {
    act(() => {
      renderWithContext(<App />);
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEnter = screen.getByRole('button', { name: /enter/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnEnter).toBeInTheDocument();
  });
});
