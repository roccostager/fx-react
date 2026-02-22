import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes';

const router = createBrowserRouter(routes);

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App