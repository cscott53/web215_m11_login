import { useEffect } from "react"

export default function Header() {
    useEffect(() => {
        setTimeout(() => {
            if (document.querySelector('header .links')) {
                document.querySelectorAll('header .links:not(:last-of-type)')
                    .forEach(e=>e.outerHTML+=' ')
            }
        }, 500)
    }, [])
    return (
        <header>
            <h1>Charles Scott - Curious Squirrel - WEB215</h1>
            <span className="links header"><a href="https://cscott53.github.io/web215/">Home</a></span>
            <span className="links header"><a href="https://cscott53.github.io/web215/introduction.html">Introduction</a></span>
            <span className="links header"><a href="https://cscott53.github.io/web215/contract.html">Contract</a></span>
            <span className="links header"><a href="https://cscott53.github.io/web215/brand.html">Brand</a></span>
            <span className="links header"><a href="https://cscott53.github.io/web215/introduction_form.html">Intro form</a></span>
            <span className="links header"><a href="https://web215-mern.onrender.com">MERN stack</a></span>
        </header>
    )
}
