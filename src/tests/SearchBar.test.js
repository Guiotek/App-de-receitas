import { act, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';

afterEach(() => jest.clearAllMocks());

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(meals),
  }));
});

const searchInputBox = 'search-input';
const firstLetter = 'first-letter-search-radio';
const searchBtnStr = 'search-btn';
const nameRadioStr = 'name-search-radio';

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    window.alert = jest.fn();

    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    expect(history.location.pathname).toBe('/meals');

    const searchBtn = screen.getByTestId(searchBtnStr);

    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputBox);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(nameRadioStr);
    const firstLetterRadio = screen.getByTestId(firstLetter);
    const btnBusca = screen.getByRole('button', { name: /busca/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnBusca).toBeInTheDocument();
  });

  test('Testa busca por ingrediente', async () => {
    const { history } = renderWithRouter(<App />, '/meals/');

    const searchBtn = screen.getByTestId(searchBtnStr);

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInputBox);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const btnBusca = screen.getByRole('button', { name: /busca/i });

    userEvent.type(searchInput, 'cocoa');
    userEvent.click(ingredientRadio);

    userEvent.click(btnBusca);
    await waitFor(() => userEvent.click(btnBusca));

    await waitFor(() => expect(history.location.pathname).toBe('/meals/'));
  });

  test('Testa busca por Nome', async () => {
    renderWithRouter(<App />, '/meals/');

    const searchBtn = screen.getByTestId(searchBtnStr);

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInputBox);
    const nameRadio = screen.getByTestId(nameRadioStr);
    const btnBusca = screen.getByRole('button', { name: /busca/i });

    userEvent.type(searchInput, 'beef');
    userEvent.click(nameRadio);
    userEvent.click(btnBusca);

    expect(global.fetch).toBeCalledTimes(5);
  });

  test('Testa busca pela primeira letra', async () => {
    renderWithRouter(<App />, '/meals/');

    const searchBtn = screen.getByTestId(searchBtnStr);

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInputBox);
    const firstLetterRadio = screen.getByTestId(firstLetter);
    const btnBusca = screen.getByRole('button', { name: /busca/i });

    userEvent.type(searchInput, 'p');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnBusca);

    expect(global.fetch).toBeCalledTimes(5);
  });

  test('Testa alert da primeira letra', async () => {
    renderWithRouter(<App />, '/meals/');

    const searchBtn = screen.getByTestId(searchBtnStr);

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInputBox);
    const firstLetterRadio = screen.getByTestId(firstLetter);
    const btnBusca = screen.getByRole('button', { name: /busca/i });

    userEvent.type(searchInput, 'kkk');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnBusca);

    expect(global.fetch).toBeCalledTimes(4);

    expect(window.alert).toBeCalled();
  });
});
