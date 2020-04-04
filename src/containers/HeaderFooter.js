import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

export default ({ children, templateName}) => {
  return (
    <div className={`container ${templateName}`}>
      <Header />
      <main role='main'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
