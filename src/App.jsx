import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { SortList } from './components/SortList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const SORT_BY_REVERSE = 'Reverse';
const RESET = 'Reset';

function getSortedGoods(goods, sortField, initialGoods) {
  const preparedGoods = [...goods];

  if (RESET === sortField) {
    return initialGoods;
  }

  if (SORT_BY_REVERSE === sortField) {
    return preparedGoods.reverse();
  }

  return preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [currGoods, setCurrGoods] = useState(goodsFromServer);
  const initialGoods = [...goodsFromServer];
  const visibleGoods = getSortedGoods(currGoods, sortField, initialGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'Sort alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setSortField('Sort alphabetically');
            setCurrGoods(visibleGoods);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'Sort by length' ? '' : 'is-light'}`}
          onClick={() => {
            setSortField('Sort by length');
            setCurrGoods(visibleGoods);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField === 'Reverse' ? '' : 'is-light'}`}
          onClick={() => {
            setSortField('Reverse');
            setCurrGoods(visibleGoods);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger is-light ${sortField === '' || sortField === 'Reset' ? 'is-invisible' : ''}`}
          onClick={() => {
            setSortField('Reset');
            setCurrGoods(visibleGoods);
          }}
        >
          Reset
        </button>
      </div>

      <SortList list={visibleGoods} />
    </div>
  );
};
