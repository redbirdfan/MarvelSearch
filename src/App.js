import logo from './logo.svg';
import './App.css';
import CharacterSearch from './CharacterSearch';
import Footer from './Footer';

function App() {
  return (
    <div>
    <div className="App">
      <header className="App-header">
        <img src={'https://th.bing.com/th/id/OIP.xAqsO4tSd4CHsXjh28-mMAHaEK?rs=1&pid=ImgDetMain'} className="Marvel-logo" alt="logo" />

      </header>
      <CharacterSearch />
    </div>
      <Footer />
    </div>

  );
  
}

export default App;
