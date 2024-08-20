import React from 'react'
import { useSession } from '../service/SessonDataService'

export const USER_ACTION = {
  DO_ORDER: 'DO_ORDER'
}

const USER_ROLE = {
  NOT_ACTIVE: 'NOT_ACTIVE',
  ACTIVE: 'ACTIVE'
}

const ABILITIES_MAP = {
  [USER_ROLE.NOT_ACTIVE]: [],
  [USER_ROLE.ACTIVE]: [USER_ACTION.DO_ORDER]
}

const isUserAble = (toDo, grantedAbilities) => {
  return toDo.some((userAction) => grantedAbilities.includes(userAction))
}

export const IfAble = ({ children, toDo = [], errorComponent = null }) => {
  const { user } = useSession()

  const role = user?.active ? USER_ROLE.ACTIVE : USER_ROLE.NOT_ACTIVE
  const grantedAbilities = ABILITIES_MAP[role]
  const permissionGranted = isUserAble(toDo, grantedAbilities)

  if (!permissionGranted) return errorComponent // or null by default

  return <>{children}</>
}
