import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

export default ({ children }) => {
  return (
    <div class="container">
      <Header />
      <main role="main">{children}</main>
      <Footer />
    </div>
  )
}
