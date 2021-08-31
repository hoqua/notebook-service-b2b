import React, { useEffect, useState } from 'react'
import { useNotify } from '../../../hooks/useSnakbar'
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
import { LoginContentWrapper } from './styles'
import { useAuth } from '../../../service/AuthService'

export default function Registration () {
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })
  const { signIn, loading } = useAuth()
  const { showError } = useNotify()

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  const login = async () => {
    const invalidProp = validate(formData, validationSchemaArr)
    if (invalidProp) return setFormError({ ...defaultFormErrorsState, [invalidProp]: true })

    try {
      await signIn(formData.email, formData.password)
    } catch (e) {
      setFormError({ ...defaultFormErrorsState })
      showError(e.message)
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
                  to='#' onClick={() => login()}
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
