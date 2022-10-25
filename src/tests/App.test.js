import { act, screen, within } from '@testing-library/react';
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

describe('Implementa testes no Header', () => {
  test('Testa elementos no Header', () => {
    act(() => {
      renderWithContext(<App />);
    });
    const linkProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    within(linkProfile).getByRole('img', {
      name: /profile/i,
    });

    expect(linkProfile).toBeInTheDocument();

    const searchBtn = screen.getByTestId('search-btn');

    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
