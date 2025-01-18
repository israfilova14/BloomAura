import './App.css'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavigationBar from './components/layout/navigation_bar' 
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
       <ToastContainer/>
       <NavigationBar/>
       <main className='py-3'>
          <Outlet/>
       </main>
    </div>
  );
}

export default App;
