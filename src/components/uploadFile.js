import React from 'react'
import { Button, Grid, makeStyles, Input, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { isUndefined } from 'lodash'

const useStyles = makeStyles(() => ({
  field: {
    marginTop: '18px'
  }
}))

const UploadPDF = (props) => {
  const classes = useStyles()
  return (
    <Grid container alignItems="center" className={classes.field}>
      <Grid>
        <Button
          variant="contained"
          color="primary"
          component="label"
          startIcon={<CloudUploadIcon />}>
          Subir archivo
          <Input
            type="file"
            name="file"
            inputProps={{ accept: '.pdf' }}
            style={{ display: 'none' }}
            onChange={(e) => props.uploadFile(e.target.files)}
          />
        </Button>
        {isUndefined(props.file) ? (
          <Typography>{props.file.name}</Typography>
        ) : (
          <Typography>Aun no has seleccionado un archivo</Typography>
        )}
      </Grid>
      &nbsp;
      <Grid id="text-file"></Grid>
    </Grid>
  )
}
export default UploadPDF
