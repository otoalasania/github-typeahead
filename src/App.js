import React, {useEffect, useState} from 'react';
import './style/style.css';
import searchIcon from "./svg/search.svg"
import closeIcon from "./svg/close.svg"


function App() {
  const [inputText, setInputText] = useState("")
  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [userUrl, setUserUrl] = useState("")
  const [state, setState] = useState(false)

  const closeIconClose =() =>{
    setState(false)
    setInputText("")
  }

  const inputCall = (e) =>{
    setInputText(e.target.value)
    setState(true)
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${inputText.length > 0 ? inputText :"o"}`)
    .then(res => res.json())
    .then(data => {
      setUserName(data.login)
      setUserAvatar(data.avatar_url)
      setUserUrl(data.html_url)
    })
  },[inputText])

  return (
    <div className="App">
      <div className='mainBox'>
        <h1 className='header'>Github Typeahead</h1>
        <div className='ujra'>
          <div className='inputBox'>
            <img className='searchIc' src={searchIcon} alt="search"></img>
            <input 
            className='input' 
            value={inputText} type="text" 
            placeholder='Search' 
            onChange={inputCall}
            />
            <img className={state ? "closeIcOpen" : "closeIcClosed"} onClick={closeIconClose} src={closeIcon} ></img>
          </div>
          {state && <div className='userOutput'>
            <img className='avatar' src={userAvatar}></img>
            <p className='username'>{userName}</p>
            <a className='url' href={userUrl} target="_blank">{userUrl && "Visit Profile"}</a>
          </div>}
        </div>
      </div>
      <footer><p>Made by Oto Alasania</p></footer>
    </div>
  );
}

export default App;
