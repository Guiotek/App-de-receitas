import { act, screen } from '@testing-library/react';
import React from 'react';
// import SearchBar from '../components/SearchBar';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

afterEach(() => jest.clearAllMocks());

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    window.alert = jest.fn();

    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEnter = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    userEvent.click(btnEnter);

    expect(history.location.pathname).toBe('/meals');

    const searchBtn = screen.getByTestId('search-btn');

    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const btnBusca = screen.getByRole('button', { name: /busca/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnBusca).toBeInTheDocument();

    userEvent.type(searchInput, 'pizza');
    userEvent.click(nameRadio);
    userEvent.click(btnBusca);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    userEvent.type(searchInput, 'cocoa');
    userEvent.click(ingredientRadio);
    userEvent.click(btnBusca);

    expect(global.fetch).toHaveBeenCalledTimes(6);

    userEvent.type(searchInput, 'p');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnBusca);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    userEvent.type(searchInput, 'xablê');
    userEvent.click(nameRadio);
    userEvent.click(btnBusca);

    expect(window.alert).toBeCalled();

    userEvent.type(searchInput, 'kkkkk');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnBusca);

    expect(window.alert).toBeCalled();

    act(() => { history.push('/drinks'); });
    expect(history.location.pathname).toBe('/drinks');

    userEvent.type(searchInput, 'water');
    userEvent.click(nameRadio);
    userEvent.click(btnBusca);

    expect(history.location.pathname).toBe('/drinks');
  });
});

describe('Implementa testes', () => {
  test('Testa', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));

    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });
  });
});
