import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { NameProvider } from './context'
import { useState } from 'react'

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retryOnMount: true,
      },
    }
  }
)

function App() {

  const [name, setName] = useState('');


  return (
    <CookiesProvider >
      <QueryClientProvider client={queryClient}>
        <NameProvider.Provider value={{ name, setName }}>
          <RouterProvider router={router} />
        </NameProvider.Provider>
      </QueryClientProvider>
    </CookiesProvider>
  )
}

export default App
