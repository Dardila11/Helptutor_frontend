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
  Typography
} from '@material-ui/core'
import { isUndefined } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1)
  },
  main: {
    margin: theme.spacing(1)
  },
  label: {
    marginTop: theme.spacing(1)
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

  const options = {
    service: (
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
    ),
    publication: (
      <Box>
        <Typography>publicaciones</Typography>
      </Box>
    ),
    advertisement: (
      <Box>
        <Typography>anuncios</Typography>
      </Box>
    ),
    services: (
      <Box>
        <Typography>servicios</Typography>
      </Box>
    )
  }

  const renderFilters = (option) => options[option]

  return (
    <Paper component="form" className={classes.root}>
      <Box className={classes.main} display="flex" flexDirection="column">
        <TextField
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
        {!isUndefined(option) ? (
          <Box className={classes.label} textAlign="center">
            <Typography>
              <b>Filtrar por</b>
            </Typography>
            {renderFilters(option)}
          </Box>
        ) : null}
      </Box>
    </Paper>
  )
}

export default SearchBar
