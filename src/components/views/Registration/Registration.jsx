import React, { useEffect, useState } from 'react'
import PublicLayout from '../../shared/layouts/PublicLayout'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import { WrapPageLight } from '../../shared/styled/WrapPageLight'
import { HeadTile, StyledLink, StyledText } from '../../shared/styled/Typography'
import { ActionsContainer, RegistrationContainer, RegistrationForm } from './styles'
import { SpacerH20, SpacerH25, SpacerH40 } from '../../shared/styled/Spacers'
import { StyledInput } from '../../shared/styled/StyledInput'
import ClientCaptcha from 'react-client-captcha'
import StyledCheckbox from '../../shared/styled/StyledCheckbox'
import { NavigationButton } from '../../shared/styled/NavigationButton'
import { defaultFormErrorsState, defaultFormState, validationSchemaArr } from './helpers'

export default function Registration () {
  const [capcha, setCapcha] = useState('')
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  const validate = () => {
    const invalidValidateObj = validationSchemaArr.find(validate => {
      const formValue = formData[validate.prop]
      const isValid = validate.validator(formValue)

      return !isValid
    })
    if (!invalidValidateObj) return null

    return invalidValidateObj.prop
  }

  const register = () => {
    const invalidProp = validate()
    if (invalidProp) {
      setFormError({ ...defaultFormErrorsState, [invalidProp]: true })
      return
    }
    console.log('no invalid props')
  }

  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <RegistrationContainer>
            <HeadTile>Регистрация</HeadTile>

            <RegistrationForm>
              <SpacerH40 />

              <label>Название фирмы</label>
              <StyledInput
                type='text'
                placeholder='Введите название фирмы'
                onChange={({ target }) => setFormData({ ...formData, firm: target.value })}
                error={formErrors.firm}
              />

              <label>Имя и фамилия</label>
              <StyledInput
                type='text'
                placeholder='Введите ваше имя'
                onChange={({ target }) => setFormData({ ...formData, name: target.value })}
                error={formErrors.name}
              />

              <label>Эл. почта (login)</label>
              <StyledInput
                type='email' placeholder='Введите эл. почту'
                onChange={({ target }) => setFormData({ ...formData, email: target.value })}
                error={formErrors.email}
              />

              <label>Пароль</label>
              <StyledInput
                type='password'
                placeholder='Введите пароль'
                onChange={({ target }) => setFormData({ ...formData, password: target.value })}
                error={formErrors.password}
              />

              <label>Телефон</label>
              <StyledInput
                type='tel' placeholder='Введите ваш номер телефона'
                onChange={({ target }) => setFormData({ ...formData, phone: target.value })}
                error={formErrors.phone}
              />

              <label>Telegram</label>
              <StyledInput
                type='text'
                placeholder='Введите ваш логин telegram'
                onChange={({ target }) => setFormData({ ...formData, telegram: target.value })}
                error={formErrors.telegram}
              />

              <ClientCaptcha height={38} captchaCode={code => setCapcha(code)} />
              <StyledInput
                type='text'
                placeholder='Введите символы'
                onChange={({ target }) => setFormData({ ...formData, capcha: target.value === capcha })}
                error={formErrors.capcha}
              />
            </RegistrationForm>
            <SpacerH20 />

            <StyledCheckbox
              error={formErrors.agreed}
              onChange={isAgreed => setFormData({ ...formData, agreed: isAgreed })}
            >
              <StyledText>Я согласен с условиями <StyledLink to='/'>политики конфиденциальности</StyledLink>
              </StyledText>
            </StyledCheckbox>
            <SpacerH25 />

            <ActionsContainer>
              <NavigationButton to='#' onClick={() => register()}>Зарегистрироваться</NavigationButton>
            </ActionsContainer>
            <SpacerH20 />

            <ActionsContainer>
              <StyledText>У вас уже есть аккаунт? <StyledLink to='/login'>Войдите</StyledLink></StyledText>
            </ActionsContainer>

          </RegistrationContainer>
        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}
