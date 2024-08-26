import React, { useState } from 'react';
import Pokedex from 'pokedex-promise-v2'


const P = new Pokedex()


function PokemonCharacterSearch() { 
    const [pokeCharacterData, setPokeCharacterData] = useState(null);
    const [pokeCharacterName, setPokeCharacterName] = useState('')
    const [err, setErr] = useState()
    

    const pokemonCharacterFinder = async (res, err) => {
        console.log('attempting to connect to poke API')
        console.log(pokeCharacterName)

            try {
                const pokemonData = await P.getPokemonByName(pokeCharacterName)
                setPokeCharacterData(pokemonData)
                console.log(pokeCharacterData)
            } catch (error) {
                console.error("Pokemon is in another region!", error);
                setErr(error.message);
                setPokeCharacterData(null)
            }
        };
    

    return (
        <div>
           <header className="App-header">
                <img src={'https://th.bing.com/th/id/OIP.Vw_KuEL919GZpSbyoeXw9gHaEK?rs=1&pid=ImgDetMain'} className="Marvel-logo" alt="logo" />
            </header>
            <input type="text" 
             onChange={(event) => setPokeCharacterName(event.target.value)}
             placeholder="Who are we catching?"
             />
        
            <button onClick={pokemonCharacterFinder}>...I choose you!</button>
            <div>

            {pokeCharacterData != null  &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex:'1', marginRight: '20px'}}>            
                    <img style={{padding: '50px', borderBlockColor: 'black'}} src= {pokeCharacterData.sprites.front_shiny} alt={'No Pic Available'} width = '250' height = '250'></img>    
                </div>
                <div style={{flex:2, alignItems: 'center'}}>    
                    <h2 style={{marginRight: '100px'}}>{pokeCharacterData.name}</h2>
                    <p style={{marginRight: '100px'}}>{}</p>
                </div>
            </div>     
            } 
            {pokeCharacterData === null &&
                <div>
                    <p>Character not found.  Please check your spelling.</p>
                </div>
            } 
        </div>
    </div>    
    );
}


export default PokemonCharacterSearch;