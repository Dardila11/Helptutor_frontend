import React, {useState} from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IconButton, makeStyles, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  scrollTop: {
    position: 'fixed', 
    width: '100%',
    bottom: '20px',
    alignItems: 'center',
    height: '20px',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'pointer',
    animation: 'fadeIn 0.3s',
    transition: 'opacity 0.4s',
    opacity: 0.7,
  }
}))


const ScrollArrow = () =>{
  const classes = useStyles()
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 500){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 500){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <>
        <IconButton className={classes.scrollTop} variant="contained" color="primary" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}>
            <ArrowUpwardIcon/>
        </IconButton>
    </>
  );
}

export default ScrollArrow;