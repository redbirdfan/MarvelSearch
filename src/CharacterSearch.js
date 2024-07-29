import React, { useState } from 'react';
import axios from 'axios';
import cryptoJS from 'crypto-js';


function CharacterSearch() { 
    const [characterData, setCharacterData] = useState();
    const [characterName, setCharacterName] = useState('')
    const [err, setErr] = useState()
    const [imgURL, setImgURL] = useState()
    const [infoURLs, setInfoURLs] = useState([])

    const characterFinder = async (res, err) => {
        console.log('attempting to connect to Marvel API')
        
        const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
        const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
        const ts = new Date().getTime().toString();
        const hash = cryptoJS.MD5(ts + privateKey + publicKey).toString();
        const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(characterName)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
        try {
            const res = await axios.get(url);

            const data = res.data.data.results;
           
            if(data) {
                setCharacterData(data);
                setImgURL(characterData[0].thumbnail[0])
                setInfoURLs(characterData[0].urls)
            } else {
                console.log('Character not found');
                setCharacterData(null);
            }    
            console.log(characterData)
                console.log(characterData[0].name)
                console.log(characterData[0].thumbnail.path)
                console.log(characterData[0].description)
                console.log("URL example " + characterData[0].infoURLs[0])
        } catch(err) {
            console.error("Our character is in another castle!", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <input type="text" 
             value={characterName} 
             onChange={(event) => setCharacterName(event.target.value)}
             placeholder="Enter Character Name"
             />
        
            <button onClick={characterFinder}>Search Character Name</button>
            <div>

            {characterData != null &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex:'1', marginRight: '20px'}}>            
                    <img style={{padding: '10px', borderBlockColor: 'black'}} src= {(characterData[0].thumbnail.path)+'/standard_fantastic.jpg'} alt={'No Pic Available'}></img>    
                </div>
                <div style={{flex:2}}>    
                    <h2>{characterData[0].name}</h2>
                    <p style={{marginRight: '100px'}}>{characterData[0].description}</p>
                </div>  
            </div>     
            } 
            {characterData === null &&
                <div>
                    <p>Character not found.  Please check your spelling.</p>
                </div>
            } 
        </div>
    </div>    
    );
}


export default CharacterSearch;
