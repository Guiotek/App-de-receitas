import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import { drinks } from '../../cypress/mocks/drinks';

// const searchButton = 'exec-search-btn';
const recip6 = '6-recipe-card';

describe('Testando Tela principal de receitas', () => {
  it('Testa se renderiza 12 elementosl', async () => {
    renderWithRouter(<App />);

    const mailPut = screen.getByTestId('email-input');
    const passPut = screen.getByTestId('password-input');
    const butt = screen.getByTestId('login-submit-btn');

    userEvent.type(mailPut, 'dezgraca@mail.com');
    userEvent.type(passPut, '6661999');
    userEvent.click(butt);

    const res0 = await screen.findByTestId('0-recipe-card');
    expect(res0).toBeInTheDocument();
    const res1 = await screen.findByTestId('1-recipe-card');
    expect(res1).toBeInTheDocument();
    const res2 = await screen.findByTestId('2-recipe-card');
    expect(res2).toBeInTheDocument();
    const res3 = await screen.findByTestId('3-recipe-card');
    expect(res3).toBeInTheDocument();
    const res4 = await screen.findByTestId('4-recipe-card');
    expect(res4).toBeInTheDocument();
    const res5 = await screen.findByTestId('5-recipe-card');
    expect(res5).toBeInTheDocument();
    const res6 = await screen.findByTestId(recip6);
    expect(res6).toBeInTheDocument();
    const res7 = await screen.findByTestId('7-recipe-card');
    expect(res7).toBeInTheDocument();
    const res8 = await screen.findByTestId('8-recipe-card');
    expect(res8).toBeInTheDocument();
    const res9 = await screen.findByTestId('9-recipe-card');
    expect(res9).toBeInTheDocument();
    const res10 = await screen.findByTestId('10-recipe-card');
    expect(res10).toBeInTheDocument();
    const res11 = await screen.findByTestId('11-recipe-card');
    expect(res11).toBeInTheDocument();
  });

  it('Teste de filtro Beef', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
    const btnClickBeef = await screen.findByRole('button', { name: /beef/i });
    expect(btnClickBeef).toBeInTheDocument();
    userEvent.click(btnClickBeef);
    const btnClickBeef2 = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(btnClickBeef2).toBeInTheDocument();
    const btnClickBeef3 = await screen.findByRole('heading', { name: /beef and oyster pie/i });
    expect(btnClickBeef3).toBeInTheDocument();
    const btnClickBeef4 = await screen.findByRole('heading', {
      name: /beef banh mi bowls with sriracha mayo, carrot & pickled cucumber/i,
    });
    expect(btnClickBeef4).toBeInTheDocument();
    const btnClickBeef5 = await screen.findByRole('heading', { name: /beef bourguignon/i });
    expect(btnClickBeef5).toBeInTheDocument();
    const btnClickBeef6 = await screen.findByRole('heading', { name: /beef brisket pot roast/i });
    expect(btnClickBeef6).toBeInTheDocument();
    const btnClickBeef7 = await screen.findByRole('heading', { name: /beef dumpling stew/i });
    expect(btnClickBeef7).toBeInTheDocument();
    const btnClickBeef8 = await screen.getByTestId('6-recipe-card');
    expect(btnClickBeef8).toBeInTheDocument();
    const btnClickBeef9 = await screen.getByTestId('7-recipe-card');
    expect(btnClickBeef9).toBeInTheDocument();
    const btnClickBeef10 = await screen.getByRole('img', { name: /beef stroganoff/i });
    expect(btnClickBeef10).toBeInTheDocument();
    const btnClickBeef11 = await screen.getByRole('img', { name: /beef wellington/i });
    expect(btnClickBeef11).toBeInTheDocument();
    const btnClickBeef12 = await screen.getByTestId('11-recipe-card');
    expect(btnClickBeef12).toBeInTheDocument();
  });

  it('Testando /drink', async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(drinks),
    // }));

    const { history } = renderWithRouter(<App />, '/drinks');

    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));

    const ordinaryFilter = await screen.findByRole('button', { name: /ordinary drink/i });

    const allFilter = await screen.findByRole('button', { name: /all/i });

    expect(allFilter).toBeInTheDocument();

    userEvent.click(ordinaryFilter);

    userEvent.click(ordinaryFilter);

    userEvent.click(allFilter);

    expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
  });
});
