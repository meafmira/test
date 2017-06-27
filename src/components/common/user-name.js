import React from 'react'

export default function UserName({ user }) {
  if (!user) return null
  return <span>{user.firstName} {user.lastName}</span>
}
