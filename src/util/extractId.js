export const extractId = (uri) => {
  const match = /\/lottery\/login\?sid=([a-zA-Z0-9_-]+)$/.exec(uri)
  return match ? match[1] : null
}
