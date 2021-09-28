import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    description: values.description,
  }
}

const validation = 
Yup.object().shape({
  title: Yup.string().max(255).required("El anuncio debe tener un titulo"),
  description: Yup.string().max(255).required("El anuncio debe tener una descripción")
})

const logConst = {
  getValues,
  validation
}

export default logConst
