import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box
} from '@material-ui/core'

const TermsAndConditions = ({ handleDialogClose }) => {
  return (
    <>
      <DialogTitle disableTypography>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Terminos y Condiciones</Box>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          /* ref={descriptionElementRef} */
          tabIndex={-1}>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
      </DialogContent>
    </>
  )
}

export default TermsAndConditions
