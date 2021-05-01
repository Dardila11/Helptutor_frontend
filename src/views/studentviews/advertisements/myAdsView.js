import React, { useEffect } from 'react'

const MyAdsView = (props) => {
    const {getStudentAdvertisements, advertisements} = props
    useEffect(()=>{
        getStudentAdvertisements()
    },[])
    return(
        <>
        </>
    )
}

const mapStateToProps = (state) => ({
    advertisements: state.advertisements.myadvertisements,
  })

export default connect(mapStateToProps, {
    getStudentAdvertisements
  })(MyAdsView)