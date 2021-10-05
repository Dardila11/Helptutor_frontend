import React from 'react'

import Tutors from './images/tutors.png'
import Horario from './images/horario.png'
import Publicaciones from './images/publicaciones.png'
import Virtual from './images/virtual.png'


import './style.css'

const Tutorial = () => {
  return (
    <>
      <div className="sec3--container">
        <h2>¿Cómo funciona HelpTutor?</h2>
        <p>
          Simple, son clases online, en directo, con un profesor particular para
          tí
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
              <img src={Tutors} alt="tutors" />
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
              <img src={Horario} alt="schedule" />
            </div>
          </div>          
          <div className="steps step3">
            <div className="step--box">
              <h3>Publica sobre los temas que necesitas ayuda!</h3>
              <p>
                Nuestra plataforma te permite publicar los temas en que
                requieres asesorías y escoger los tutores que se postulen para
                ayudarte!
              </p>
            </div>
            <div className="step--box step">
              <span>3</span>
            </div>
            <div className="step--box">
              <img src={Publicaciones} alt="publications" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tutorial
