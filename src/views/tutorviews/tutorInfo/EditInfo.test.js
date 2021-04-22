import React from 'react'
import { render, fireEvent, screen, cleanup, waitFor } from 'src/test-utils'
import EditInfoView from 'src/views/tutorviews/tutorInfo/EditInfoView'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

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
  rest.get(API_URL + 'api/tutor/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: userInfo
      })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

/* beforeEach(() => {
  /**
   * render our component with a initialState.
   * this render comes from our test-util.js
   
  render(<EditInfoView />, {
    initialState: {
      auth: {
        user: { id: 35 }
      }
    }
  })
}) */

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe('TutorEditInfo View', () => {
  it('loading data', async () => {
    let loading = screen.getByRole('progressbar')
    expect(loading).toBeInTheDocument()

  })
  it('edit info form is visible', async () => {
    const {  getByTestId } = render(<EditInfoView />, {
      initialState: {
        auth: {
          user: { id: 35 },
          requestInProgess: false
        }
      }
    })
    let email = await getByTestId('email')
    expect(email).toBeDisabled()
  })
})

