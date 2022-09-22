import PropTypes from 'prop-types'
import Image from 'next/future/image'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Button from '@mui/material/Button'

function SocialMediaCardContent({name, profilUrl, customIcon}) {
  return (
    <ListItem sx={{mb: 3}} secondaryAction={
      <Button size='large' variant='outlined' onClick={event => {
        event.preventDefault()
        window.open(profilUrl, '_blank') // eslint-disable-line no-undef
      }}
      >Voir mon profil</Button>
    }
    >
      <ListItemAvatar>
        {customIcon ? (
          <Image
            alt={customIcon}
            width={48}
            height={48}
            title={customIcon.split('.')[0]}
            src={`/images/icons/${customIcon}`}
          />
        ) : (
          <i title={name} className={`fa fa-${name} fa-3x`} aria-hidden='true' />
        )}
      </ListItemAvatar>
    </ListItem>
  )
}

SocialMediaCardContent.propTypes = {
  name: PropTypes.string.isRequired,
  profilUrl: PropTypes.string.isRequired,
  customIcon: PropTypes.string
}

SocialMediaCardContent.defaultProps = {
  customIcon: null
}

export default SocialMediaCardContent
