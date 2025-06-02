import Navigation from "./Navigation"

import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation/>
        {children} 
        <Footer/>
    </div>
  )
}

export default Layout