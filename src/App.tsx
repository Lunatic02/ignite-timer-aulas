import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import { CyclesContextProvider } from './contexts/CyclesContext'



export function App() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
          <CyclesContextProvider>
              <Router />
          </CyclesContextProvider>
            <GlobalStyle />
          </BrowserRouter>  
      </ThemeProvider>
    </>
  )
}
 
