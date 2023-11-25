import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContent from "./components/AppContent"

export default function App() {

  return (
      <div className="container">
          <div className="card m-2">
              <div className="card-body">
                  <AppContent/>
              </div>
          </div>
      </div>
  )
}
