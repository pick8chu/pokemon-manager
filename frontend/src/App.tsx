import React, { useState } from 'react';
import './App.css';
import { PokemonCard, PokemonInfo } from './component/PokemonCard';
import { getPokemonCount, getPokemons } from './api/PokemonHandler';
import styled from 'styled-components';
import { Pagination } from 'react-bootstrap';
import { ModalPokemon } from './component/ModalPokemon';

const SearchDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
`;

const CardListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 10px;
`;

const PaginataionDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

function App() {
  const [searchText, setSearchText] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([]);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  // const [showPokemonModal, setShowPokemonModal] = useState<boolean>(false);
  // const [pokemon, setPokemon] = useState<PokemonInfo>({} as PokemonInfo);

  const searchPokemonCount = async () => setTotal(await getPokemonCount(searchText));

  const searchPokemons = async () => setPokemons(await getPokemons(searchText, page, limit));

  const initSearch = () => {
    searchPokemonCount();
    searchPokemons();
  };

  React.useEffect(() => {
    initSearch();
  }, [page, limit]);

  return (
    <div className="App">
      <header />

      <SearchDiv>
        <div>
          <ModalPokemon cb={initSearch}/>
        </div>
        <div>
          <input type="text" placeholder="Search Pokemon by its name" value={searchText} onChange={event => setSearchText(event.target.value)}></input>
          <button onClick={initSearch}>Search</button>
        </div>
        <div>
          <label>item per page</label>
          <select
            onChange={event => {
              setPage(1);
              setLimit(parseInt(event.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </SearchDiv>

      <CardListDiv>
        {pokemons.map((pokemon, index) => {
          return <PokemonCard key={(page - 1) * 10 + index} {...pokemon} />;
        })}
      </CardListDiv>

      <PaginataionDiv>
        <Pagination>
          <Pagination.First onClick={() => setPage(Math.max(1, page - 10))} disabled={page === 1} />
          <Pagination.Prev onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} />

          {Array.from({ length: Math.min(10, Math.ceil(total / limit) - Math.floor(page / 10) * 10) }, (_, i) => {
            const idx = Math.floor(page / 10) * 10 + i + 1;
            return (
              <Pagination.Item key={idx} active={idx === page} onClick={() => setPage(idx)}>
                {idx}
              </Pagination.Item>
            );
          })}

          <Pagination.Next onClick={() => setPage(Math.min(page + 1, Math.ceil(total / limit)))} disabled={page === Math.ceil(total / limit)} />
          <Pagination.Last onClick={() => setPage(Math.min(page + 10, Math.ceil(total / limit)))} disabled={page === Math.ceil(total / limit)} />
        </Pagination>
      </PaginataionDiv>
    </div>
  );
}

export default App;
