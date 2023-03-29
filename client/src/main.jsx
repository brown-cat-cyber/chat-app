import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.scss"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "@/state/api"
import AuthContexts from "./components/context/AuthContext"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefalt) => getDefalt().concat(api.middleware),
})
setupListeners(store.dispatch)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContexts>
      <App />
    </AuthContexts>
  </Provider>
)
