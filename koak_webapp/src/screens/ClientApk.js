import React, { useEffect } from 'react'

export default function ClientApk() {
    useEffect(() => {
        fetch("/mobile.apk")
    }, [])
    
  return (
    <div>ClientApk</div>
  )
}
