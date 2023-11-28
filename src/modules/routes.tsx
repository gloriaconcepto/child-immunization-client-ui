import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import HomeManagerView from './home';


const AppRoutes:React.FC=()=>{
    return(
        <Router>
        <Routes>
          <Route path="/" element={<HomeManagerView/>} />
        </Routes>
      </Router>
    )
}
export default AppRoutes