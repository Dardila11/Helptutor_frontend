import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    awarded_by: values.awarded_by,
    year: values.year,
    user: 12
  }
}

const validation = Yup.object().shape({
  title: Yup.string().max(255).required('El titulo del certificado es obligatorio'),
  awarded_by: Yup.string().max(255).required('La institución que otorgó el certificado es obligatoria'),
  year: Yup.number().max(2021).required('El año en que fue expedido el certificado es obligatorio'),
  file: Yup.mixed().required()
})

const logConst = {
  getValues,
  validation
}

export default logConst
