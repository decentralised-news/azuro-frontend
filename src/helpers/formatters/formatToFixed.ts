const formatToFixed = (value: string | number, digitsCount: number): string => {
  value = String(value)

  if (!/\./.test(value)) {
    return value
  }

  const [ int, digits ] = value.split('.')

  return `${int}.${digits!.substr(0, digitsCount)}`
}

export default formatToFixed
