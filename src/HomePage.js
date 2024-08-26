import React, { useState } from 'react';
import axios from 'axios';
import cryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate()

    const marvelClick = () => {
        navigate('/MarvelCharacterSearch');
    }

    
    const pokemonClick = () => {
        navigate('/pokemonSearch');
    }
    return(
        <div>
            <h1 style={{ textAlign: 'center'}}>The Fan Cave</h1>
            <button type='button' onClick = {marvelClick}>
                <img src = {'https://th.bing.com/th/id/OIP.xAqsO4tSd4CHsXjh28-mMAHaEK?rs=1&pid=ImgDetMain'} alt="Marvel button"></img>
            </button>
            <button type='button' onClick = {pokemonClick}>
                <img src = {'https://th.bing.com/th/id/OIP.Vw_KuEL919GZpSbyoeXw9gHaEK?rs=1&pid=ImgDetMain'} alt="pokemon button"></img>
            </button>
        </div>
    );
}

export default HomePage;