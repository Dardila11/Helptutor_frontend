import React from 'react'
import { Box, Button, Grow, makeStyles, MobileStepper, Paper, Typography, useTheme } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(1),
        elevation: 3,
        padding: theme.spacing(2)
    },
    stepper: {
        maxWidth: 400,
        flexGrow: 1
    }
}))

const photosStepper = [
    {
        source: 'https://www.dominioestudio.com/sites/default/files/styles/large/public/2021-04/educacion_virtual.jpg?itok=y9jXJM84',
        name: 'profesor'
    },
    {
        source: 'https://estaticos-cdn.elperiodico.com/clip/a6584c5e-8c59-410a-8664-94fcd73b02fd_alta-libre-aspect-ratio_default_0.jpg',
        name: 'clases'
    }
]

const Dashboard = () =>{

    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [checked, setChecked] = React.useState(true);

    const theme = useTheme()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setChecked(true);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
        setChecked(true)
    }
    return (
        <Page title='Inicio'>
            <Box className={classes.root}>
                <Box textAlign='center'>
                    <Paper className={classes.container}>
                        <Typography variant='h4'>
                            <b>TUTORIAS PERSONALIZADAS EN LINEA</b>
                        </Typography>
                        <Typography>
                            Si necesitas ayuda en un tema en especifico, nuestra plataforma HELPTUTOR es la respuesta a tus problemas, te lo mostramos a
                            continuación
                        </Typography>
                    </Paper>
                </Box>
                <Paper className={classes.container} >
                    <Box>
                        <Grow in={checked}>
                            <img src={photosStepper[activeStep].source} alt={photosStepper[activeStep].source}/>
                        </Grow>
                    </Box>
                    <MobileStepper
                        variant="dots"
                        steps={photosStepper.length}
                        position="static"
                        activeStep={activeStep}
                        className={classes.stepper}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === photosStepper.length}>
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </Button>
                        }
                        />
                </Paper>
            </Box>
        </Page>
    )
} 

export default Dashboard