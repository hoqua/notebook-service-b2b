import React, { useEffect, useState } from 'react'
import PublicLayout from '../../shared/layouts/PublicLayout'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { WrapPageLight } from '../../shared/styled/WrapPageLight'
import { HeadTile, StyledLink, StyledText } from '../../shared/styled/Typography'
import { SpacerH20, SpacerH25, SpacerH40 } from '../../shared/styled/Spacers'
import { StyledInput } from '../../shared/styled/StyledInput'
import ClientCaptcha from 'react-client-captcha'
import StyledCheckbox from '../../shared/styled/StyledCheckbox'
import { NavigationButton } from '../../shared/styled/NavigationButton'
import { defaultFormErrorsState, defaultFormState, validationSchemaArr } from './helpers'
import { useSignUp } from '../../../service/PublicUserService'
import { useNotify } from '../../../hooks/useSnakbar'
import { PublicForm, PublicFromActionsContainer } from '../../shared/styled/PublicForm'
import { validate } from '../../../utils/validators'
import { FullPage } from '../../shared/styled/Fullpage'
import { useHistory } from 'react-router-dom'

export default function Registration () {
  const [capcha, setCapcha] = useState('')
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })
  const { signUp, response, loading } = useSignUp()
  const history = useHistory()
  const { showError, showSuccess } = useNotify()

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  const register = async () => {
    const invalidProp = validate(formData, validationSchemaArr)
    if (invalidProp) {
      setFormError({ ...defaultFormErrorsState, [invalidProp]: true })
      return
    }

    await signUp(formData)

    if (response.ok) {
      showSuccess('Вы успешно зарегистрировались!')
      history.push('/')
      return null
    } else {
      showError(`Ошибка регистрации. ${response?.data?.err_msg || ''}`)
    }
  }

  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <FullPage>
            <HeadTile>Регистрация</HeadTile>

            <PublicForm>
              <SpacerH40 />

              <label>Название фирмы</label>
              <StyledInput
                type='text'
                placeholder='Введите название фирмы'
                onChange={({ target }) => setFormData({
                  ...formData,
                  firm: target.value
                })}
                error={formErrors.firm}
              />

              <label>Имя и фамилия</label>
              <StyledInput
                type='text'
                placeholder='Введите ваше имя'
                onChange={({ target }) => setFormData({
                  ...formData,
                  name: target.value
                })}
                error={formErrors.name}
              />

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

              <label>Телефон</label>
              <StyledInput
                type='tel' placeholder='Введите ваш номер телефона'
                onChange={({ target }) => setFormData({
                  ...formData,
                  phone: target.value
                })}
                error={formErrors.phone}
              />

              <label>Telegram</label>
              <StyledInput
                type='text'
                placeholder='Введите ваш логин telegram'
                onChange={({ target }) => setFormData({
                  ...formData,
                  telegram: target.value
                })}
                error={formErrors.telegram}
              />

              <ClientCaptcha height={38} captchaCode={code => setCapcha(code)} />
              <StyledInput
                type='text'
                placeholder='Введите символы'
                onChange={({ target }) => setFormData({
                  ...formData,
                  capcha: target.value === capcha
                })}
                error={formErrors.capcha}
              />
            </PublicForm>
            <SpacerH20 />

            <StyledCheckbox
              error={formErrors.agreed}
              onChange={isAgreed => setFormData({
                ...formData,
                agreed: isAgreed
              })}
            >
              <StyledText>Я согласен с условиями <StyledLink to='/'>политики конфиденциальности</StyledLink>
              </StyledText>
            </StyledCheckbox>
            <SpacerH25 />

            <PublicFromActionsContainer>
              <NavigationButton
                to='#' onClick={() => register()}
                disabled={loading}
              >Зарегистрироваться
              </NavigationButton>
            </PublicFromActionsContainer>
            <SpacerH20 />

            <PublicFromActionsContainer>
              <StyledText>У вас уже есть аккаунт? <StyledLink to='/'>Войдите</StyledLink></StyledText>
            </PublicFromActionsContainer>

          </FullPage>
        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}
