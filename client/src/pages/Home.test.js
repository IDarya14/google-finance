import { Home } from './Home';
import { renderWithRedux } from '../App.test';

test('Home renders correctly', () => {
  const { getByText, container } = renderWithRedux(<Home />);
  const button = getByText('Refresh list');
  expect(button).toBeInTheDocument();
  expect(
    container.getElementsByClassName('table__closeallbtn')[0]
  ).toBeInTheDocument();
});
