import Image from 'next/future/image'

import avatar from '../public/images/avatar.png'

const css = {
  width: 150,
  margin: 'auto',
  borderRadius: 2,
  marginTop: 2,
  display: 'block'
}

function Avatar() {
  return (
    <Image
      style={css}
      src={avatar}
      width='150'
      alt='Avatar'
    />
  )
}

export default Avatar
