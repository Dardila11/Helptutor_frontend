import React from 'react'

/* import Classes from './images/iloveimg50/classes.png'
import Publications from './images/iloveimg50/publications.png'
import Schedule from './images/iloveimg50/schedule.png'
import Tutors from './images/iloveimg50/tutors.png' */
import './style.css'

const Tutorial = () => {
  return (
    <>
      <div className="sec3--container">
        <h2>¿Cómo funciona HelpTutor?</h2>
        <p>
          Simple, son clases online, en directo, con un profesor particular para
          ti
        </p>
        <div className="group-box">
          <div className="steps step1">
            <div className="step--box">
              <h3>Encuentra tu profesor ideal</h3>
              <p>
                Entre nuestros miles de profesores, encontrarás a tu profesor
                ideal. Se adaptará a tus necesidades y te ayudará a alcanzar tus
                objetivos.
              </p>
            </div>
            <div className="step--box step">
              <span>1</span>
            </div>
            <div className="step--box">
              {/* <img src={Classes} alt="classes" /> */}
            </div>
          </div>
          <div className="steps step2">
            <div className="step--box">
              <h3>Compagina las clases con tu vida</h3>
              <p>
                Escoge un profesor online según tu disponibilidad horaria y
                disfruta de la flexibilidad de las clases en línea.
              </p>
            </div>
            <div className="step--box step">
              <span>2</span>
            </div>
            <div className="step--box">
              {/* <img src={Schedule} alt="schedule" /> */}
            </div>
          </div>
          <div className="steps step3">
            <div className="step--box">
              <h3>Aprende en nuestra aula virtual</h3>
              <p>
                Nuestra aula virtual tiene todo lo necesario para que realices
                las clases: Videoconferencia, pizarra, edición de documentos
                online...
              </p>
            </div>
            <div className="step--box step">
              <span>3</span>
            </div>
            <div className="step--box">
              {/* <img src={Publications} alt="publications" /> */}
            </div>
          </div>
          <div className="steps step4">
            <div className="step--box">
              <h3>Publica sobre los temas que necesitas ayuda!</h3>
              <p>
                Nuestra plataforma te permite publicar los temas en que
                requieres asesorias y escoger los tutores que se postulen para
                ayudarte!
              </p>
            </div>
            <div className="step--box step">
              <span>4</span>
            </div>
            <div className="step--box">
              {/* <img src={Tutors} alt="tutors" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tutorial
