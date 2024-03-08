export default () => {
  const webtestList = [
    'events-wendy',
    'events-tim',
    'events-ryan',
    'events-johnny',
    'events-jackie',
    'events-hardy',
    'events-dino',
    'events-chiaenchung',
    'events-cherry_2',
    'events-cherry',
  ]
  const hostname = window.location.hostname
  const isWebtest = webtestList.some(i => hostname.includes(i))
  const isDev = import.meta.env.DEV;

  return {
    isWebtest,
    isDev
  }
}