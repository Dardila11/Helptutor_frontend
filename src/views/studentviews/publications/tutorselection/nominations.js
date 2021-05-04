import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { getPublicationNominations } from 'src/redux/actions/student/student_publications'
import { connect } from 'react-redux'
import NominationCard from 'src/components/NominationCard'

const NominationsView = (props) => {
    const { publication, nominations, getPublicationNominations, next } = props
    useEffect(()=>{
        getPublicationNominations(publication.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
    return(
        <Grid container>
            {nominations.map((nomination, index)=>(
                <Grid item xs={4}>
                    <NominationCard 
                        id={'nom_'+nomination.id} 
                        key={nomination.id+'_'+index} 
                        nomination={nomination}
                        next={next}/>
                </Grid>
                )
            )}            
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    nominations: state.publications.nominations
  })
  
  export default connect(mapStateToProps, {
    getPublicationNominations
  })(NominationsView)