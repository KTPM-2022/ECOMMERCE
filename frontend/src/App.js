import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserLayout from 'src/layouts/UserLayout';
import AdminLayout from 'src/layouts/AdminLayout';
import { publicRoutes, privateRoutes, adminRoutes } from './routes';
import { getProductCategory } from 'src/features/productCategory/productCategorySlice';
import RequiredLogin from './components/RequiredLogin';
import 'src/assets/css/style.css';

function App() {
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => state.productCategory.value);

  useEffect(() => {
    dispatch(getProductCategory());
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = UserLayout;
            if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          ;
          {privateRoutes.map((route, index) => {
            let Layout = UserLayout;
            if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <RequiredLogin>
                      <Page />
                    </RequiredLogin>
                  </Layout>
                }
              />
            );
          })}
          ;
          {adminRoutes.map((route, index) => {
            let Layout = AdminLayout;
            if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
