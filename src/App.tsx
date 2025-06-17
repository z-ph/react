import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { Skeleton,} from "antd";
function App() {
  const routeElements = useRoutes(routes)
  return (
    <div className="App">
      <Suspense
        fallback={
          <Skeleton active />
        }
      >
        {routeElements}
      </Suspense>
    </div>
  )
}

export default App