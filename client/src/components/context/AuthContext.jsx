import React, { useState } from "react"
import { createContext } from "react"

export const AuthContext = createContext({})

const AuthContexts = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [chatProps, setChatProps] = useState(false)

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, chatProps, setChatProps }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContexts
