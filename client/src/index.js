
import ReactDomClient from 'react-dom/client'
import App from './App'
import './css/index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {Toaster} from 'react-hot-toast'



const root = ReactDomClient.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()



root.render(
    <>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster position='bottom-right' />
        </QueryClientProvider>
    </>
)
