import React, { useEffect, useState } from 'react'
import PublicLayout from '../../shared/layouts/PublicLayout'
import { WrapPageLight } from '../../shared/styled/WrapPageLight'
import { PublicContentContainer } from '../../shared/styled/PublicContentContainer'
import {
  HeadTile,
  StyledLink,
  StyledText
} from '../../shared/styled/Typography'
import { SpacerH20, SpacerH40 } from '../../shared/styled/Spacers'
import { StyledInput } from '../../shared/styled/StyledInput'
import { AppButton } from '../../shared/styled/NavigationButton'
import {
  defaultFormErrorsState,
  defaultFormState,
  validationSchemaArr
} from './service'
import {
  PublicFromActionsContainer,
  StyledFromInputsWrapper
} from '../../shared/styled/PublicForm'
import { validate } from '../../../utils/validators'
import { LoginContentWrapper } from './styles'
import { useAuth } from '../../../service/AuthService'
import { toast } from '../../shared/Toaster/use-toast'

export default function Registration() {
  const [formData, setFormData] = useState({ ...defaultFormState })
  const [formErrors, setFormError] = useState({ ...defaultFormErrorsState })
  const { signIn, loading } = useAuth()

  useEffect(() => {
    setFormError({ ...defaultFormErrorsState })
  }, [formData])

  const login = async () => {
    const invalidProp = validate(formData, validationSchemaArr)
    if (invalidProp)
      return setFormError({ ...defaultFormErrorsState, [invalidProp]: true })

    try {
      await signIn(formData.email, formData.password)
    } catch (e) {
      setFormError({ ...defaultFormErrorsState })
      toast({
        title: e.message,
        variant: 'destructive'
      })
    }
  }

  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <LoginContentWrapper>
            <div>
              <HeadTile>Вход</HeadTile>

              <form>
                <StyledFromInputsWrapper>
                  <SpacerH40 />

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
                    onKeyDown={(e) => e.key === 'Enter' && login()}
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
                    onKeyDown={(e) => e.key === 'Enter' && login()}
                  />
                </StyledFromInputsWrapper>
              </form>
              <SpacerH20 />

              <PublicFromActionsContainer>
                <AppButton onClick={() => login()} disabled={loading}>
                  Войти
                </AppButton>
              </PublicFromActionsContainer>
              <SpacerH20 />
            </div>

            <PublicFromActionsContainer>
              <StyledText>
                У вас ещё нет аккаунта?{' '}
                <StyledLink to="/registration">Зарегистрируйтесь</StyledLink>
              </StyledText>
            </PublicFromActionsContainer>
          </LoginContentWrapper>
        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}
