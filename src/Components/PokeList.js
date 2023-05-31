import React, { useEffect, useState } from 'react';

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=18');
        const data = await response.json();

        const pokemonData = await Promise.all(data.results.map(async (result) => {
          const pokemonResponse = await fetch(result.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map((type) => type.type.name),
          };
        }));

        const reducedData = pokemonData.reduce((accumulator, pokemon) => {
          accumulator.push(pokemon);
          return accumulator;
        }, []);

        setPokemons(reducedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-10 mt-12'>
      {pokemons.map((pokemon) => (
        <div  className='bg-white border outline-4 outline-yellow-500 border-yellow-700 mb-10 transition ' key={pokemon.id}>
          <img className='w-32 mx-auto' src={pokemon.image} alt={pokemon.name} />
          <p className='text-black text-center text-lg font-bold'>{pokemon.name}</p>
          <p className='text-gray-800 text-md text-center'>ID: {pokemon.id}</p>
          <p className='text-gray-800 text-md text-center'>Types: {pokemon.type.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default PokeList;

