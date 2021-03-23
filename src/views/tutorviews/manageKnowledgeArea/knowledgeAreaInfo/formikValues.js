import * as Yup from 'yup'
import { isUndefined } from 'lodash-es'

const initialValues = (values) => {
  if (isUndefined(values)) {
    return {
      option: true,
      area: {
        area: '',
        subarea: '',
        description: '',
        tags: ''
      }
    }
  } else {
    return {
      option: false,
      area: {
        area: '',
        subarea: '',
        description: values.description,
        tags: values.tags
      }
    }
  }
}

const validation = Yup.object().shape({
  area: Yup.string().max(255).required('Area requerida'),
  subarea: Yup.string().max(255).required('Sub area requerida'),
  description: Yup.string().max(255),
  tags: Yup.string().max(255)
})

const logConst = {
  initialValues,
  validation
}

export default logConst
