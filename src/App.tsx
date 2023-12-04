import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import UserContextProvider from "./contexts/userContext"

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
