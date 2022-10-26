import { act, screen } from '@testing-library/react';
import React from 'react';
// import SearchBar from '../components/SearchBar';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithContext from './renderWithContext';
import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';

afterEach(() => jest.clearAllMocks());

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    act(() => {
      renderWithContext(<App />);
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEnter = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    userEvent.click(btnEnter);

    const showSearchBtn = screen.getByTestId('search-btn');
    expect(showSearchBtn).toBeInTheDocument();

    userEvent.click(showSearchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByRole('button', { name: /busca/i });

    expect(inputSearch).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.type(inputSearch, 'pizza');
    userEvent.click(ingredientRadio);
    userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.type(inputSearch, 'tomato');
    userEvent.click(nameRadio);
    userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    userEvent.type(inputSearch, 't');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
