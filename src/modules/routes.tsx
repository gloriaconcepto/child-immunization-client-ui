import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import HomeManagerView from './home';
import PageNotFound from './notFound';


const AppRoutes:React.FC=()=>{
    return(
        <Router>
        <Routes>
          <Route path="/" element={<HomeManagerView/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
    )
}
export default AppRoutes