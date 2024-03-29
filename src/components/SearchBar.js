import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import {
  Box,
  Container,
  InputAdornment,
  Slider,
  TextField,
  Typography,
  withWidth
} from '@material-ui/core'
import { isUndefined } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: '20px',
    width: '100%'
  },
  principalContainer: {
    margin: theme.spacing(1),
    width: '100%'
  }
}))

const marks = [
  { value: 0, label: '0' },
  { value: 25000, label: '25mil' },
  { value: 50000, label: '50mil' },
  { value: 75000, label: '75mil' },
  { value: 100000, label: '100mil' }
]

const SearchBar = (props) => {
  const classes = useStyles()
  const { option, setQuery, setFilter } = props
  const [filterNow, setFilterNow] = useState({ label: '', value: 0 })

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  function valuetext(value) {
    const values = { label: 'cost', value: value }
    if (filterNow.value !== values.value) {
      setFilter(values)
      setFilterNow(values)
    }
    return `${value / 1000}mil`
  }

  const renderFilters = (option) => {
    switch (option) {
      case 'servicios':
        return (
          <Box>
            <Box>
              <Typography>Costo por hora $</Typography>
              <Container>
                <Slider
                  defaultValue={0}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1000}
                  marks={marks}
                  min={0}
                  max={100000}
                />
              </Container>
            </Box>
          </Box>
        )
      case 'publicaciones':
        return <Typography>publicaciones</Typography>
      case 'anuncios':
        return (
          <Box>
            <Typography>advertisements filters</Typography>
          </Box>
        )
      default:
        return (
          <Box>
            <Typography>No has definido filtros para {option}</Typography>
          </Box>
        )
    }
  }

  return (
    <Paper component="form" className={classes.root}>
      <Box
        className={classes.principalContainer}
        display="flex"
        flexDirection="column">
        {!isUndefined(option) ? (
          <Box textAlign="center">
            <b>Filtrar por {renderFilters(option)}</b>
          </Box>
        ) : (
          <></>
        )}
        <Box>
          <TextField
            className={classes.input}
            id="searchInput"
            label={'Buscar'}
            variant="outlined"
            color="primary"
            size="small"
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default SearchBar
