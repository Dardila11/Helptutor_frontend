import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

import { connect } from 'react-redux'
import CardsViewSkeleton from 'src/components/skeletons/CardsViewSkeleton'
import SearchBar from 'src/components/SearchBar'
import ConsultancieCard from 'src/components/cards/consultancieCard'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    width: 900,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardsContent: {
    margin: theme.spacing(2),
    borderRadius: '20px'
  },
  title: {
    margin: theme.spacing(1)
  }
}))

const StudentConsultanciesView = (props) => {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [listFilter, setListFilter] = useState(null)
  const [filter, setFilter] = useState({label: '', value: 0})
  const loading = false

  const consultancies = [{ id: 1, title: 'Clase de electromagnetismo' ,tutor:'Alexander Villaquiran', slot: {day: 'lunes', start: 12, end: 13}, link: 'https://meet.google.com/php-knjy-mke' }]

  useEffect(
    () => {
      if(query==='') setListFilter(null)
      else setListFilter(consultancies.filter(cons => cons.title.toLowerCase().includes(query.toLowerCase()) || cons.description.toLowerCase().includes(query.toLowerCase())))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  )  

  useEffect(() => {
    filters(filter)
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [filter])

  function filters(filt) {
    switch (filt.label) {
      case 'cost':
        if(filt.value!==0){
          if(!listFilter===null)setListFilter(listFilter.filter(serv => serv.price <= filt.value))
          else setListFilter(consultancies.filter(serv => serv.price <= filt.value))
        }
        break;
    
      default:
        break;
    }
  }

  return (
    <Page title="Asesorias">
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box>
          <SearchBar option={'asesorias'} list={consultancies} setQuery={setQuery} setFilter={setFilter}/>
        </Box>
        <Box>
          <Paper elevation={3} className={classes.root}>
            {loading ? (
              <CardsViewSkeleton />
            ) : (
              <>
                <Box className={classes.title} textAlign="center">
                  <Typography variant="h4">Asesorias</Typography>
                </Box>
                <Box>
                {listFilter===null? (
                    <>
                    {consultancies.map((consultancie, index) => (
                  <ConsultancieCard
                    key={index}
                    id={consultancie.id}
                    consultancie={consultancie}
                    isStudent={true}
                    isSearch={false}
                  />
                ))}
                    </>
                  ):(
                    <>
                    {listFilter.length > 0 ? (
                      <>
                      {listFilter.map((consultancie, index) => (
                        <ConsultancieCard
                        key={index}
                        id={consultancie.id}
                        consultancie={consultancie}
                        isStudent={true}
                        isSearch={true}
                        query={query}
                      />
                      ))}
                      </>
                    ):(
                      <Box className={classes.nofindbox} textAlign='center'>
                          <Typography>
                            No se encontraron asesorias que contengan "{query}"
                          </Typography>
                      </Box>
                    )}
                    </>
                  )}       
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Page>
  )
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(StudentConsultanciesView)
