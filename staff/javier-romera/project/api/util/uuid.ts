const uuid = (): string => (Date.now() + Math.random()).toString(36).replace('.', '')

export default uuid