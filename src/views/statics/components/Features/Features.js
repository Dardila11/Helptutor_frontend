import React from 'react'

// Features Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import './style.css'

const Features = () => {
  return (
    <>
      <div className="sec2--container">
        <h2> ¡Aprender nunca fue tan facil! </h2>
        <div className="sec2--container-features">
          <div className="box" id="flexible">
            <AccessTimeIcon color="primary" style={{ fontSize: 45 }} />
            <h3>Flexible</h3>
            <p>Escoge un tutor que trabaje segun tu horario</p>
          </div>
          <div className="box" id="secure">
            <VerifiedUserIcon color="primary" style={{ fontSize: 45 }} />
            <h3>Seguro</h3>
            <p>Nosotros nos encargamos de todo. Tu disfruta las clases</p>
          </div>
          <div className="box" id="tutors">
            <EmojiEventsIcon color="primary" style={{ fontSize: 45 }} />
            <h3>Tutores calificados</h3>
            <p>
              Alcanza tus metas con más de <span>500</span> tutores calificados
            </p>
          </div>
          <div className="box" id="money">
            <MonetizationOnIcon color="primary" style={{ fontSize: 45 }} />
            <h3>Ahorras dinero</h3>
            <p>Clases economicas, sin minimo de horas, sin cargos ocultos</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Features
