import Image from 'next/future/image'

import img from '../public/images/background.jpg'

const css = {
  position: 'fixed',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  zIndex: -1
}

function Background() {
  return (
    <Image
      sizes='100vw'
      width='100vw'
      style={css}
      alt='Diamond Rock Martinique'
      src={img}
    />
  )
}

export default Background
