import React from 'react'

export default ({ style: { width = '100%' }, ...props }) => {
  return (
    <div
      style={{
        width,
        paddingTop: width,
        position: 'relative',
      }}
    >
      <img
        alt="aspect"
        {...props}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}
