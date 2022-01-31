import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'gzan1agb',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skI5lP7v99IS3cCsl4yuzw3Mmgcm0Nq3eaW3K1eU4cYTsf6uNYdFk3pat4Yywdrmf8fZE5gd9eMLkB1V5IJ5Amfpl2FmYRxqmZkQYDWeDu8NvocFqNyUDgZxZ21Tra8WFdzYKjm8MUxRTB2kiU3A7rOPuZMfOmKnwZW2PvD8EzW2zPdLedfq',
  useCdn: false,
})
