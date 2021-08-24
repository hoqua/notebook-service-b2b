import React, { useEffect, useState } from 'react'
import { useNotify } from '../../../hooks/useSnakbar'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import PublicLayout from '../../shared/layouts/PublicLayout'
import { WrapPageLight } from '../../shared/styled/WrapPageLight'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { HeadTile, StyledLink, StyledText } from '../../shared/styled/Typography'
import { SpacerH20, SpacerH40 } from '../../shared/styled/Spacers'
import { StyledInput } from '../../shared/styled/StyledInput'
import { NavigationButton } from '../../shared/styled/NavigationButton'
import { defaultFormErrorsState, defaultFormState, validationSchemaArr } from './helpers'
import { PublicForm, PublicFromActionsContainer } from '../../shared/styled/PublicForm'
import { validate } from '../../../utils/validators'
import { useAuth } from '../../../hooks/auth'
import { LoginContentWrapper } from './styles'

export default function Registration () {
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })
  const { signIn, data, error, loading } = useAuth()
  const { showError } = useNotify()
  const [, setToken] = useLocalStorage('token')

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  useEffect(() => {
    if (error) {
      setFormError({ ...defaultFormErrorsState })
      setToken('new token')
      showError('Ошибка входа')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  const register = async () => {
    const invalidProp = validate(formData, validationSchemaArr)
    if (invalidProp) {
      setFormError({ ...defaultFormErrorsState, [invalidProp]: true })
    } else {
      await signIn(formData.email, formData.password)
    }
  }

  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <LoginContentWrapper>
            <div>

              <HeadTile>Вход</HeadTile>

              <PublicForm>
                <SpacerH40 />

                <label>Эл. почта (login)</label>
                <StyledInput
                  type='email' placeholder='Введите эл. почту'
                  onChange={({ target }) => setFormData({
                    ...formData,
                    email: target.value
                  })}
                  error={formErrors.email}
                />

                <label>Пароль</label>
                <StyledInput
                  type='password'
                  placeholder='Введите пароль'
                  onChange={({ target }) => setFormData({
                    ...formData,
                    password: target.value
                  })}
                  error={formErrors.password}
                />
              </PublicForm>
              <SpacerH20 />

              <PublicFromActionsContainer>
                <NavigationButton
                  to='#' onClick={() => register()}
                  disabled={loading}
                >
                  Войти
                </NavigationButton>
              </PublicFromActionsContainer>
              <SpacerH20 />
            </div>

            <PublicFromActionsContainer>
              <StyledText>У вас ещё нет аккаунта? <StyledLink to='/registration'>Зарегистрируйтесь</StyledLink></StyledText>
            </PublicFromActionsContainer>
          </LoginContentWrapper>

        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}
