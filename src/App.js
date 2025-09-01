import './App.css';
import { useRoutes, Link } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';

function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/add', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> }
  ]);

  return (
    <div className="App">
      <nav className="container-fluid">
        <ul>
          <li><strong><Link to="/">CreatorVerse</Link></strong></li>
        </ul>
        <ul>
          <li><Link to="/" role="button" className="outline">All Creators</Link></li>
          <li><Link to="/add" role="button">Add Creator</Link></li>
        </ul>
      </nav>
      <main>
        {routes}
      </main>
    </div>
  );
}

export default App;
