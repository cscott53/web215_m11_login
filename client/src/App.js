import './App.css'
import Footer from './Footer'
import Header from './Header'
import { useEffect } from "react"
function App() {
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
      <main></main>
      <Footer/>
    </div>
  )
}
export default App