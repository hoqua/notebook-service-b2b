import React, { useEffect, useRef, useState } from 'react'
import PublicLayout from '../../shared/layouts/PublicLayout'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { WrapPageLight } from '../../shared/styled/WrapPageLight'
import {
  HeadTile,
  StyledLink,
  StyledText
} from '../../shared/styled/Typography'
import { SpacerH20, SpacerH25, SpacerH40 } from '../../shared/styled/Spacers'
import { StyledInput } from '../../shared/styled/StyledInput'
import StyledCheckbox from '../../shared/styled/StyledCheckbox'
import { AppButton } from '../../shared/styled/NavigationButton'
import {
  defaultFormErrorsState,
  defaultFormState,
  validationSchemaArr
} from './service'
import { useSignUp } from '../../../service/PublicUserService'
import {
  PublicFromActionsContainer,
  StyledFromInputsWrapper
} from '../../shared/styled/PublicForm'
import { validate } from '../../../utils/validators'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { fullPage } from '../../shared/styled/css'
import ClientCaptcha from './components/client-captcha'
import { toast } from '../../shared/Toaster/use-toast'

export default function Registration() {
  const formRef = useRef(null)
  const [capcha, setCapcha] = useState('')
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })
  const { signUp, response, loading } = useSignUp()
  const navigate = useNavigate()

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  const register = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    const invalidProp = validate(formData, validationSchemaArr)
    const reportValidity = formRef.current.reportValidity()

    if (invalidProp || !reportValidity) {
      setFormError({ ...defaultFormErrorsState, [invalidProp]: true })
      return
    }

    await signUp(formData)

    if (response.ok) {
      toast({
        title: 'Вы успешно зарегистрировались',
        style: { color: 'green' }
      })
      navigate('/')
      return null
    } else {
      toast({
        title: `Ошибка регистрации. ${response?.data?.err_msg || ''}`,
        variant: 'destructive'
      })
    }
  }

  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <RegistrationWrapper>
            <div>
              <HeadTile>Регистрация</HeadTile>

              <form
                onKeyPress={(event) =>
                  event.key === 'Enter' ? register(event) : null
                }
                ref={formRef}
              >
                <StyledFromInputsWrapper>
                  <SpacerH40 />

                  <label>Название фирмы</label>
                  <StyledInput
                    type="text"
                    placeholder="Введите название фирмы"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        firm: target.value
                      })
                    }
                    $error={formErrors.firm}
                    required
                  />

                  <label>Имя и фамилия</label>
                  <StyledInput
                    type="text"
                    placeholder="Введите ваше имя"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        name: target.value
                      })
                    }
                    $error={formErrors.name}
                    required
                  />

                  <label>Эл. почта (login)</label>
                  <StyledInput
                    type="email"
                    placeholder="Введите эл. почту"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        email: target.value
                      })
                    }
                    $error={formErrors.email}
                    required
                  />

                  <label>Пароль</label>
                  <StyledInput
                    type="password"
                    placeholder="Введите пароль"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        password: target.value
                      })
                    }
                    $error={formErrors.password}
                    required
                  />

                  <label>Телефон</label>
                  <StyledInput
                    type="number"
                    placeholder="Введите ваш номер телефона"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        phone: target.value
                      })
                    }
                    $error={formErrors.phone}
                    required
                  />

                  <label>Telegram</label>
                  <StyledInput
                    type="text"
                    placeholder="Введите ваш логин telegram"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        telegram: target.value
                      })
                    }
                    $error={formErrors.telegram}
                    required
                  />

                  <ClientCaptcha
                    height={38}
                    width={100}
                    captchaCode={(code) => {
                      setCapcha(code)
                      setFormData({ ...formData, capcha: false })
                    }}
                  />
                  <StyledInput
                    type="text"
                    placeholder="Введите символы"
                    onChange={({ target }) =>
                      setFormData({
                        ...formData,
                        capcha: target.value === capcha
                      })
                    }
                    $error={formErrors.capcha}
                    required
                  />
                </StyledFromInputsWrapper>
                <SpacerH20 />

                <StyledCheckbox
                  $error={formErrors.agreed}
                  onChange={(isAgreed) =>
                    setFormData({
                      ...formData,
                      agreed: isAgreed
                    })
                  }
                  required
                >
                  <StyledText>
                    Я согласен с условиями{' '}
                    <StyledLink to="/">политики конфиденциальности</StyledLink>
                  </StyledText>
                </StyledCheckbox>
                <SpacerH25 />

                <PublicFromActionsContainer>
                  <AppButton onClick={register} disabled={loading}>
                    Зарегистрироваться
                  </AppButton>
                </PublicFromActionsContainer>
              </form>
            </div>

            <PublicFromActionsContainer>
              <StyledText>
                У вас уже есть аккаунт? <StyledLink to="/">Войдите</StyledLink>
              </StyledText>
            </PublicFromActionsContainer>
          </RegistrationWrapper>
        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}

const RegistrationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${fullPage}
`
