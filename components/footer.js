import PropTypes from 'prop-types'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import PublicIcon from '@mui/icons-material/Public'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

function Footer({url, text}) {
  return (
    <footer>
      <Divider />
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBlock: 0.5}}>
        <IconButton
          color='primary'
          aria-label='go to github'
          onClick={event => {
            event.preventDefault()
            window.open(url, '_blank') // eslint-disable-line no-undef
          }}
        >
          <PublicIcon />
        </IconButton>
        {text && (
          <Link
            underline='hover'
            rel='noopener'
            href={url}
            target='_blank'
          >{text}</Link>
        )}
      </Box>
    </footer>
  )
}

Footer.defaultProps = {
  text: null
}

Footer.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default Footer
