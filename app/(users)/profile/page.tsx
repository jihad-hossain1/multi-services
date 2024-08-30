import React from 'react'
import Authorized from '../../../helpers/context/Authorized'

const Profile = () => {
  return (
    <Authorized>
      <div>Profile</div>
    </Authorized>
  )
}

export default Profile