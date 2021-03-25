import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    awarded_by: values.awarded_by,
    year: values.year,
    file: {
        filename: values.file.name,
        type: values.file.type,
        size: `${values.file.size} bytes`
    },
    user: 12
  }
}

const validation = Yup.object().shape({
  title: Yup.string().max(255),
  awarded_by: Yup.string().max(255),
  year: Yup.number().max(2021),
  file: Yup.mixed().required()
})

const logConst = {
  getValues,
  validation
}

export default logConst
