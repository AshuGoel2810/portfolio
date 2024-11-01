import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'; // Updated import to use Routes
import FallbackSpinner from './Pages/FallbackSpinner';
import NavBarWithRouter from './Pages/NavBar';
import Home from './Pages/Home';
import endpoints from './Url/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {data &&
              data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import('./Pages/' + route.component));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    element={<SectionComponent header={route.headerTitle} />}
                  />
                );
              })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
