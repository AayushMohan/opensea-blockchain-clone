import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'gzan1agb',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skEMlaI1TZtLNrInq5hs0ksbnetAdnflonQJCJUK3WEazBpPop8nLyaLKtx1PKoNiHhciT9rT5GPzM9KmSmi7oZOl8298MFVWsag3LVN3clDeuepZkYiXQ6l5hFN9tBCPpIboXdyFDZfcYNNQ60PNR9jyY0aB2SeB4maKFvrhGbrpDV6RuNE',
  useCdn: false,
})
