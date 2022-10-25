import { act, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
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

    expect(btnEnter).toBeDisabled();

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);
  });
});

describe('Implementa testes no componente Footer', () => {
  test('Testa elementos na tela', () => {
    act(() => {
      renderWithContext(<App />);
    });

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    const drinkIcon = screen.getByTestId('drink-bottom-btn');

    expect(mealIcon).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
  });
});
