import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import useMediaQuery from '@mui/material/useMediaQuery'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

import data from '../social-media-card-data.json'

import SocialMediaCardContent from '@/components/social-media-card-content'
import Avatar from '@/components/avatar'

const USERNAME = process.env.NEXT_PUBLIC_USERNAME
const EMAIL = process.env.NEXT_PUBLIC_EMAIL
const BIOGRAPHY = process.env.NEXT_PUBLIC_BIOGRAPHY

function MyCard() {
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleClick = event => {
    const anchor = (event.target.ownerDocument).querySelector(
      '#page-bottom'
    )

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  }

  return (
    <Container sx={{
      padding: 0,
      paddingTop: isMobile ? 0 : '5vh',
      width: '100%',
      marginBottom: isMobile ? 0 : 5
    }} maxWidth='sm'
    >
      <Card sx={{minWidth: 150, minHeight: 820}}>
        {USERNAME && (
          <Typography sx={{mt: 2}} align='center' variant='h4'>
            {USERNAME}
          </Typography>
        )}

        <Avatar />

        <CardContent>
          {EMAIL && (
            <Typography gutterBottom align='center' variant='body2'>
              <Link underline='hover' href={`mailto:${EMAIL}`}>{EMAIL}</Link>
            </Typography>
          )}
          {BIOGRAPHY && (
            <Typography gutterBottom align='center' variant='body2' color='text.secondary'>
              {BIOGRAPHY}
            </Typography>
          )}
          <Divider sx={{mt: 2}}>
            <Fab size='small' color='primary' aria-label='Scroll to bottom' onClick={handleClick}>
              <KeyboardDoubleArrowDownIcon />
            </Fab>
          </Divider>
          <Container sx={{mt: 2}} align='center' maxWidth='sm'>
            <List
              sx={{
                width: '100%',
                maxWidth: 360
              }}
            >
              {data.map(({id, name, profilUrl, customIcon}) => (
                <SocialMediaCardContent key={id} name={name} profilUrl={profilUrl} customIcon={customIcon} />
              ))}
            </List>
            <div id='page-bottom' />
          </Container>
        </CardContent>
      </Card>
    </Container>
  )
}

export default MyCard
