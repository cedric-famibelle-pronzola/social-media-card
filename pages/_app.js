import PropTypes from 'prop-types'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function SocialMediaCard({Component, pageProps}) {
  return (
    <Component {...pageProps} />
  )
}

SocialMediaCard.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default SocialMediaCard
