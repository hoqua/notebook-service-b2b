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
import { useSignUp } from '../../../service/Auth'
import { useNotify } from '../../../hooks/useSnakbar'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { PublicForm, PublicFromActionsContainer } from '../../shared/styled/PublicForm'
import { validate } from '../../../utils/validators'
import { Fullpage } from '../../shared/styled/Fullpage'

export default function Registration () {
  const [capcha, setCapcha] = useState('')
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })
  const { signUp, data, loading, error } = useSignUp()
  const { showError, showSuccess } = useNotify()
  const [, setToken] = useLocalStorage('token')

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  useEffect(() => {
    if (error) {
      setFormError({ ...defaultFormErrorsState })
      setToken('new token')
      showError('Ошибка регистрации!')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      console.log(data)
      showSuccess('Вы успешно зарегистрировались!')
    }
  }, [data])

  const register = async () => {
    const invalidProp = validate(formData, validationSchemaArr)
    if (invalidProp) {
      setFormError({ ...defaultFormErrorsState, [invalidProp]: true })
    } else {
      await signUp(formData)
    }
  }

  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <Fullpage>
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
              <StyledText>У вас уже есть аккаунт? <StyledLink to='/login'>Войдите</StyledLink></StyledText>
            </PublicFromActionsContainer>

          </Fullpage>
        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}
