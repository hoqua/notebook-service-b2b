export function renderSpecs(value: string) {
  if (!value || value === 'Нет') {
    return ''
  } else {
    return value + '/'
  }
}
