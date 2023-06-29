import { RouterProvider } from 'react-router-dom';
import  {router}  from './routage/route';

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
