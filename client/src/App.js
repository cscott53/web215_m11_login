import './App.css'
import Footer from './Footer'
import Header from './Header'
import { useEffect, useRef, useState } from "react"
function App() {
  let [screen, setScreen] = useState('initial'),
      username = useRef({}),
      pwd = useRef({}),
      email = useRef({}),
      newUser = useRef({}),
      newPwd = useRef({})
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
          {(()=>{
            switch (screen) {
              case 'initial':
                return (
                  <>
                    <h2>Sign up or login</h2>
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
                  <>
                    <h2>Login</h2>
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
                  </>
                )
              case 'sign up':
                return (
                  <>
                    <h2>Sign up</h2>
                    <form>
                      <label htmlFor='email'>Email</label>
                      <input type='email' id='email' ref={email}/>
                      <label htmlFor='username'>Username</label>
                      <input type='text' id='username' ref={newUser}/>
                      <label htmlFor='password'>Password</label>
                      <input type='password' id='password' ref={newPwd}/>
                      <button id='signup' onClick={e=>{
                        e.preventDefault()
                        setScreen('logged in')
                      }}>Sign up</button>
                    </form>
                  </>
                )
              case 'logged in':
                return (
                  <>
                    <h2>You're successfully logged in</h2>
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