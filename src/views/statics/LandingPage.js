import React from 'react'

import Features from './components/Features/Features';
import Tutorial from './components/Tutorial/Tutorial';
import Footer from './components/Footer/Footer'

import './style.css'
import Intro from './components/Intro/Intro';

const LandingPage = () => {
  return (
    <>
      <main className="root">
        <section className="sec1" id="sec1">
          <Intro/>
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
