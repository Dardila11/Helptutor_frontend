import React from 'react'

import Features from './components/Features/Features';
import Tutorial from './components/Tutorial/Tutorial';
import Footer from './components/Footer/Footer'

import './style.css'

const LandingPage = () => {
  return (
    <>
      <main className="root">
        <section className="sec1" id="sec1">
          <h2 className="sec1-h1">Tutorias especializadas en linea</h2>
          <p className="sec1--p">
            Si necesitas conocimiento en algún tema en especifico, nuestra
            plataforma HelpTutor es nuestra solución a tus problemas. Te lo
            mostramos a continuación!
          </p>
        </section>
        <section className="sec2" id="sec2">
          <Features/>
        </section>
        <section className="sec3" id="sec3">
          <Tutorial/>
        </section>
        {/* <section id="sec4"> title</section> */}
      </main>
      <footer id="footer">
        <Footer/>
      </footer>
    </>
  )
}

export default LandingPage
