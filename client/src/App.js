import './App.css'
import Footer from './Footer'
import Header from './Header'
import { useEffect, useRef, useState } from "react"
function App() {
  let [screen, setScreen] = useState('initial'),
      [userName,setUser] = useState(),
      username = useRef({}),
      pwd = useRef({}),
      email = useRef({}),
      newUser = useRef({}),
      newPwd = useRef({}),
      confirmPwd = useRef({}),
      {href,host} = window.location,
      apiUri = `${href.includes('https://') ? 'https' : 'http'}://${host}/api`,
      loggedin = user=>{
        setScreen('logged in')
        document.querySelectorAll('header .links a')
        .forEach(a=>a.href+=`?loggedin=true&username=${user}`)
      }
  useEffect(() => {
    if(!document.cookie.includes('loggedin')) document.cookie = `loggedin=false; expires=${(date=>{
      date.setDate(date.getDate()+7)
      return date.toString()
    })(new Date)}; path=/`
    let data = document.cookie.split(';'),
        userData = data.find(item=>item.includes('username'))?.split('=')[1]
    if (userData) loggedin(userData)
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
                      let {value:user} = username.current
                      let {value:pw} = pwd.current
                      if(!username.current.value) return alert('Username field required')
                      if(!pwd.current.value) return alert('Password field required')
                      fetch(`${apiUri}/users?username=${user}&password=${pw}`)
                      .then(res=>{
                        if(res.ok) return res.text()
                        else throw new Error('Error fetching user')
                      })
                      .then(data=>{
                        if (data=='true'){
                          setUser(user)
                          loggedin(user)
                          document.cookie = `loggedin=true; expires=${(date=>{
                            date.setDate(date.getDate()+7)
                            return date.toString()
                          })(new Date)}; path=/`
                          document.cookie = `username=${user}; expires=${(date=>{
                            date.setDate(date.getDate()+7)
                            return date.toString()
                          })(new Date)}; path=/`
                        }
                        else alert('Username or password is incorrect')
                      })
                      .catch(console.error)
                    }}>Login</button>
                    New user?
                    <button id='signup' onClick={e=>{
                      e.preventDefault()
                      setScreen('sign up')
                    }}>Sign up</button>
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
                    <label htmlFor='confirm'>Confirm password</label>
                    <input type='password' id='confirm' ref={confirmPwd}/>
                    <button id='signup' onClick={e=>{
                      e.preventDefault()
                      if(!email.current.value) return alert('Email field required')
                      if(!newUser.current.value) return alert('Username field required')
                      if(!newPwd.current.value) return alert('Password field required')
                      if(!confirmPwd.current.value) return alert('Confirm password field required')
                      if(newPwd.current.value != confirmPwd.current.value) return alert('Passwords don\'t match')
                      fetch(`${apiUri}/users`,{
                        method: 'POST',
                        headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({email:email.current.value,username:newUser.current.value,password:newPwd.current.value})
                      }).then(res=>{
                        if(res.ok) return res.text()
                        else throw new Error('Error fetching data')
                      }).then(data=>{
                        if (data.includes('already exists')) alert('User already exists')
                        else {
                          let user = newUser.current.value
                          setUser(user)
                          loggedin(user)
                          document.cookie = `loggedin=true; username=${user}; expires=${(date=>{
                            date.setDate(date.getDate()+7)
                            return date.toString()
                          })(new Date)}; path=/`
                        }
                      })
                    }}>Sign up</button>
                    Already have an account?
                    <button id='login' onClick={e=>{
                      e.preventDefault()
                      setScreen('login')
                    }}>Login</button>
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