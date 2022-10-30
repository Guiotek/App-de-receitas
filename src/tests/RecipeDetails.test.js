import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import renderWithContext from './helpers/renderWithContext';
import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';
import renderWithRouter from './helpers/renderWithRouter';

afterEach(() => jest.clearAllMocks());

describe('testa RecipeDetails', () => {
  test('Verifica renderizações', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEnter = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);

    const searchBtn = screen.getByTestId('search-btn');
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.type(searchInput, 'pizza');
    userEvent.click(nameRadio);
    userEvent.click(btnBusca);

    // const image = screen.getByTestId('recipe-photo');
    // const title = screen.getByTestId('recipe-title');
    // const category = screen.getByTestId('recipe-category');
    const ingredient1 = screen.getByTestId('1-ingredient-name-and-measure');

    // expect(image).toBeInTheDocument();
    // expect(title).toBeInTheDocument();
    // expect(category).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
  });
});
