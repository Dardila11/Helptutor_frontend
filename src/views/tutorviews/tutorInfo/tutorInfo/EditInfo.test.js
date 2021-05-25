import React from 'react'
import { render, fireEvent, screen, cleanup, waitFor } from 'src/test-utils'
import EditInfoView from 'src/views/tutorviews/tutorInfo/EditInfoView'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

let userId = 35
const API_URL = 'https://mdquilindo.pythonanywhere.com/'

const userInfo = {
  id: 35,
  firstname: 'Daniel',
  lastname: 'Ardila',
  email: 'dardila@unicauca.edu.co',
  gender: 1,
  birthday: '18/01/1996',
  interests: 'algunos',
  methodology: 'variadas',
  skills: 'muchas'
}

const server = setupServer(
  rest.get('api/tutor/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: userInfo
      })
    )
  })
)

//beforeAll(() => server.listen())
//afterAll(() => server.close())
afterEach(() => {
  //server.resetHandlers()
  cleanup()
})

beforeEach(() => {
  /**
   * render our component with a initialState.
   * this render comes from our test-util.js
   */
  render(<EditInfoView />, {
    initialState: {
      auth: {
        user: { id: 35 },
        token:
          'b0d0ef0dfb4582487c1a63e6d8774873584b3788f3577773c08edcd42ecaef06',
        isAuthenticated: true
      }
    }
  })
})

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe('TutorEditInfo View', () => {
  it.todo('Campos incompletos')
  it('loading data', async () => {
    //await screen.findByTestId('firstname')
    let loading = screen.getByRole('progressbar')
    expect(loading).toBeInTheDocument()
  })
})

/* let firstname = screen.getByTestId('firstname')
    let lastname = screen.getByTestId('lastname')
    let email = screen.getByTestId('email')
    let gender = screen.getByTestId('gender')
    let birthday = screen.getByTestId('birthday')
    let interests = screen.getByTestId('interets')
    let methodology = screen.getByTestId('methodology')
    let skills = screen.getByTestId('skills')
    let btnUpdate = screen.getByTestId('btn-update')
    expect(email).toBeDisabled() */
/* fireEvent.change(firstname, { target: { value: 'Dan' } })
    fireEvent.change(lastname, { target: { value: 'Ardila' } })
    //fireEvent.change(gender, { target: { value: 0 } })
    fireEvent.change(birthday, { target: { value: '18/10/1995' } })
    fireEvent.change(interests, { target: { value: 'muchos' } })
    fireEvent.change(methodology, { target: { value: 'pocas' } })
    fireEvent.change(skills, { target: { value: 'no te imaginas' } }) */
