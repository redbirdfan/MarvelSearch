import React, { useState } from 'react';
import axios from 'axios';
import cryptoJS from 'crypto-js';
import App from './App.css'

function MarvelCharacterSearch() { 
    
    const [characterData, setCharacterData] = useState();
    const [characterName, setCharacterName] = useState(null)
    const [err, setErr] = useState()
    const [imgURL, setImgURL] = useState()
    const [wikiURLs, setWikiURLs] = useState({})

    
    const marvelCharacterFinder = async (res, err) => {
        console.log('attempting to connect to Marvel API')
        
        const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
        const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
        const ts = new Date().getTime().toString();
        const hash = cryptoJS.MD5(ts + privateKey + publicKey).toString();
        const searchUrl = `https://gateway.marvel.com/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
        try {
            
            console.log(characterName)
            const res = await axios.get(searchUrl);

            const data = res.data.data.results;
            console.log("Character found")
            if(data.length > 0) {
                setCharacterData(data);
                setImgURL(characterData[0].thumbnail[0])
                setWikiURLs(characterData[0].urls)
            } else {
                console.log('Character not found');
                setCharacterData(null)

            }    
            console.log(characterData)
        } catch(err) {
            
            console.error("Our character is in another castle!", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <header className="App-header">
                <img src={'https://th.bing.com/th/id/OIP.xAqsO4tSd4CHsXjh28-mMAHaEK?rs=1&pid=ImgDetMain'} className="Marvel-logo" alt="logo" />
            </header>
        
            <div className='Search-placement'>
                <input 
                    
                    type="text" 
                    value={characterName} 
                    onChange={(event) => setCharacterName(event.target.value)}
                    placeholder="Enter Character Name"
                />
            
               
        <div className='Search-placement'>
            <button onClick={marvelCharacterFinder} style={{'width':175}}>Search Character Name</button> 
        </div>
        
            <div>
            {characterData &&
                <div style={{display: 'flex', alignItems: 'center'}}>        
                <div style={{flex:'1', marginRight: '20px'}}>            
                    <img style={{padding: '10px', borderBlockColor: 'black'}} src= {(characterData[0].thumbnail.path)+'/standard_fantastic.jpg'} alt={'No Pic Available'}></img>    
                </div>
                <div style={{flex:2, alignItems: 'center'}}>    
                    <h2 style={{marginRight: '100px'}}>{characterData[0].name}</h2>
                    <p style={{marginRight: '100px'}}>{characterData[0].description}</p>
                    <a style={{marginRight: '100px'}} href={characterData[0].urls[2].url} target="_blank">Comics</a>
                </div>
            </div>
            }     
            {characterData == null &&
                <div>
                    <p>Character not found.  Please check your spelling.</p>
                </div>
            } 
        </div>    
               <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', width:'100%', position: 'fixed', bottom: 0, backgroundColor: "white"}}>
                <p>©2024 MARVEL</p>
               </div>
        </div>       
     </div> 
    );
}

export default MarvelCharacterSearch;
