import { render, cleanup } from '@testing-library/react';
import App from './App';
import { initialState } from '../src/store/reducers/trickersReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../src/store/reducers/rootReducer';

export const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
afterEach(cleanup);

describe('Tickers', () => {
  const { findByTestId } = renderWithRedux(<App />, initialState);
  it('Should get trickers', async () => {
    expect(await findByTestId('list')).toBeInTheDocument();
  });
});
