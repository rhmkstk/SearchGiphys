import React,{useEffect,useState} from 'react';
import Loading from './components/loading/loading'
import Content from './components/content/content'
import Copy from './components/copy/copy'

import './App.css';

function App() {

  const API_KEY = "hPM2ynPSsLyIYHlWX8gHGC6IPOnsf0jS";
  const [gifts, setGifts] = useState([]);
  const [search, setSearch] = useState('');
  const [isData,setIsData] = useState(true);
  const [isCopied,setIsCopied] = useState('');


  useEffect(() => {
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
      .then(res => {return res.json()})
      .then(res => {setGifts(res.data)})
      .then(setIsData(false))
  },[]);

  const getSearch = e => {
    setSearch(e.target.value);
  }
  const makeSearch = () => {
    setIsData(true);
    fetch(`wss://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}`)
      .then(res => {return res.json()})
      .then(res => {setGifts(res.data); console.log(res.data)})
      .then(setSearch(''))
      .then(setIsData(false))
  }
  const stickerSearch = () => {
    setIsData(true);
    fetch(`wss://api.giphy.com/v1/stickers/search?q=${search}&api_key=${API_KEY}`)
      .then(res => {return res.json()})
      .then(res => {setGifts(res.data);  console.log(res.data)})
      .then(setSearch(''))
      .then(setIsData(false))
    }
  const copyUrl = (e) => {
    setIsCopied(e.id);
    let textField = document.createElement('textarea');
    textField.innerText = e.images.downsized_large.url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    setTimeout(() => {
      setIsCopied('');
    },1400)
  }

  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Type to search . ." value={search} 
          onChange={getSearch} onKeyUp= {e => { (e.key === 'Enter') ? makeSearch() : console.log("..") } }/>
        <button disabled={!search} onClick={makeSearch}>Gif</button>
        <button disabled={!search} onClick={stickerSearch}>Sticker</button>
      </div>
      {isData && <Loading/>}
      <div className="content"> 
        {
          gifts.map((e) => 
            <div className="imgWrapper" key={e.id} onClick={() => {copyUrl(e)}}>
              {e.id === isCopied && <Copy/>}
              <Content title={e.images.fixed_height.url} key={e.id} />
            </div>
          )
        } 
      </div>

    </div>
  );
}

export default App;
