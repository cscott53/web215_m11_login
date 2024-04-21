import './App.css'
import Footer from './Footer'
import Header from './Header'
import { useEffect, useRef, useState } from "react"
function App() {
  let [screen, setScreen] = useState('initial'),
      username = useRef({}), //using object instead of undefined/null to avoid 'undefined/null not an object' error
      pwd = useRef({})
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('.links')) {
        for (var item of ['header','footer'])
        document.querySelectorAll(`${item} .links:not(:last-of-type)`)
          .forEach(e=>e.outerHTML+=' ')
      }
    }, 500)
  }, [])
  return (
    <div className="App">
      <Header/>
        <main>
          <h2>Login/signup</h2>
          {(()=>{
            switch (screen) {
              case 'initial':
                return (
                  <>
                    <button id='login' onClick={e=>{
                      e.preventDefault() // to prevent unintended default behavior
                      setScreen('login')
                    }}>Login</button>
                    <button id='signup' onClick={e=>{
                      e.preventDefault()
                      setScreen('sign up')
                    }}>Sign up</button>
                  </>
                )
              case 'login':
                return (
                  <form>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type='text' ref={username}/>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' ref={pwd}/>
                    <button id='login' onClick={e=>{
                      e.preventDefault()
                      setScreen('logged in')
                    }}>Login</button>
                  </form>
                )
              case 'sign up':
                return (
                  <form>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email'/>
                    <label htmlFor='username'>Email</label>
                    <input type='text' id='username'/>
                    <label htmlFor='password'>Email</label>
                    <input type='password' id='password'/>
                    <button id='signup' onClick={e=>{
                      e.preventDefault()
                      setScreen('logged in')
                    }}>Sign up</button>
                  </form>
                )
              case 'logged in':
                return (
                  <>
                    You're successfully logged in
                    <button id='logout' onClick={e=>{
                      e.preventDefault()
                      setScreen('initial')
                    }}>Logout</button>
                  </>
                )
              default:break
            }
          })()}
        </main>
      <Footer/>
    </div>
  )
}
export default App