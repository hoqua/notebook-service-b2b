// app essentials
export const NOT_ACTIVE_PHONE = '094-917-5358'

// local storage
export const LOTS_CART_KEY = 'lotsCart'
export const NOTEBOOKS_CART_KEY = 'notebookCart'
export const ORDERS_STORE_KEY = 'ordersStore'

export const AUTH_TOKEN_KEY = 'token'
export const TOKEN_EXP_TIME_KEY = 'tokenExpTime'

// sentry
export const SENTRY_DSN = process.env.NODE_ENV === 'development' ? '' : 'https://9109d47a099f408da3b9429fc9c9dcc5@o1062531.ingest.sentry.io/6052948'

// api
export const API_ROOT = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : `https://${window.location.host}/api`
export const API_LOGIN = 'login.php'
export const API_LOTS = 'get-items-lot.php'
export const API_NOTEBOOKS = 'get-items-main.php'
export const API_NOTEBOOKS_UNFINISHED = 'get-items-unfinished.php'
export const API_NOTEBOOKS_BY_SERIAL = 'get-items-by-serial.php'
export const API_ORDERS = 'get-orders.php'
export const API_MANAGER = 'get-mngr-info.php'
export const API_REGISTER = 'do-register.php'
export const API_DO_ORDER = 'do-order-by-serial.php'
export const API_DO_ORDER_LOTS = 'do-order-lot.php'
export const API_FILTERS = 'get-filters.php'
export const API_FILTERS_UNFINISHED = 'get-filters-unfinished.php'

// app routes
export const ROOT_ROUTE = '/'
export const REGISTRATION_ROUTE = '/registration'
export const LOGIN_ROUTE = '/login'
export const SHOWCASE_ROUTE = '/showcase'
export const SHOWCASE_UNFINISHED_ROUTE = '/showcase-unfinished'
export const LOTS_ROUTE = '/lots'
export const SHOPPING_CART_ROUTE = '/shopping-cart'
export const ORDERS_ROUTE = '/orders'

// enum constants
export const DisplayConditions = {
  Good: 'Хорошая',
  Defective: 'С дефектом',
  Questionable: 'Под вопросом',
  Bad: 'Плохая'

}
