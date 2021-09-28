import React from 'react'

// Social Network Icons
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InstagramIcon from '@material-ui/icons/Instagram'

import './style.css'

const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="contact">
          <h2>HelpTutor 2021</h2>
        </div>
        <div className="social">
          <FacebookIcon style={{ fontSize: 40, color: '#7A7D84' }} />
          <TwitterIcon style={{ fontSize: 40, color: '#7A7D84' }} />
          <LinkedInIcon style={{ fontSize: 40, color: '#7A7D84' }} />
          <InstagramIcon style={{ fontSize: 40, color: '#7A7D84' }} />
        </div>
      </div>
    </>
  )
}

export default Footer
