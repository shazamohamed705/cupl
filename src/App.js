import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home/Home";
import HomePage from "./pages/HomePage/HomePage";
import Coupon from "./pages/CouponPage/Coupon";
import Coupont from "./pages/CouponTwo/Coupont";
import CouponThree from "./pages/CouponThree/CouponThree";
import CouponFour from "./pages/CouponFour/CouponFour";
import { useContext, useEffect } from "react";
import { DataContext } from "./contextApi/DataContext";
import StaticPage from "./pages/StaticPage/StaticPage";
import RedirectOne from "./pages/redirectone/RedirectOne";
import RedirectTwoPage from "./pages/redirectTow/RedirectTwoPage";
import RedirectThreePage from "./pages/redirectThree/RedirectThreePage";
import RedirectFourPage from "./pages/redirectFour/RedirectFourPage";
import NotFound from "./pages/not-found/NotFound";
import DefaultPage from "./pages/DefaultPage/DefaultPage";
import CouponFive from "./pages/CouponFive/CouponFive";
import CouponSix from "./pages/CouponSix/CouponSix";
import Contact from "./pages/Contact/Contact";
import TrendyolLanding from "./pages/TrendyolLanding/TrendyolLanding";

const redirectMap = {
  default: {
    0: <DefaultPage />,
  },
  default_1: {
    1: <RedirectOne />,
    0: <Coupon />,
  },
  default_2: {
    1: <RedirectTwoPage />,
    0: <Coupont />,
  },
  default_3: {
    1: <RedirectThreePage />,
    0: <CouponThree />,
  },
  default_4: {
    1: <RedirectFourPage />,
    0: <CouponFour />,
  },
  default_5: {
    1: <RedirectFourPage />,
    0: <CouponFive />,
  },
  default_6: {
    1: <RedirectFourPage />,
    0: <CouponSix />,
  },
  default_7: {
    1: <RedirectFourPage />,
    0: <TrendyolLanding />,
  },
};

const couponThemeMap = {
  default_1: <Coupon />,
  default_2: <Coupont />,
  default_3: <CouponThree />,
  default_4: <CouponFour />,
  default_5: <CouponFive />,
  default_6: <CouponSix />,
  default_7: <TrendyolLanding />,
};

const loaderStyles = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
};

const AppLoader = () => (
  <div style={loaderStyles} aria-live="polite">
    <div className="spinner-border text-success" role="status" aria-label="Loading content" />
  </div>
);

const DetermineElement = () => {
  const { id } = useParams();
  const { data, loading, setId } = useContext(DataContext);

  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id, setId]);

  if (loading || !data) {
    return <AppLoader />;
  }

  if (data === "notFound") {
    return <NotFound />;
  }

  const theme = data?.domain?.theme?.name ?? "default";
  const fakePage = data?.data?.coupons?.fake_page ?? 0;

  return redirectMap[theme]?.[fakePage] || <DefaultPage />;
};

const CouponPage = () => {
  const { id } = useParams();
  const { data, loading, setId } = useContext(DataContext);

  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id, setId]);

  if (loading || !data) {
    return <AppLoader />;
  }

  if (data === "notFound") {
    return <NotFound />;
  }

  const theme = data?.domain?.theme?.name;

  return couponThemeMap[theme] || <DefaultPage />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/old-home" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/page/:slug" element={<StaticPage />} />
        <Route
          exact
          path="/coupon/:id"
          element={<CouponPage />}
        />
        <Route
          exact
          path="/:id"
          element={<DetermineElement />}
        />
        <Route path="*" element={<NotFound />} />
        <Route exact path="/trendyol" element={<TrendyolLanding />} />
        {/* <Route path="/six" element={<CouponSix />} /> */}
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Coupon from "./pages/CouponPage/Coupon";
// import Coupont from "./pages/CouponTwo/Coupont";
// import CouponThree from "./pages/CouponThree/CouponThree";
// import CouponFour from "./pages/CouponFour/CouponFour";
// import { useContext } from "react";
// import { DataContext } from "./contextApi/DataContext";
// import RedirectOne from "./pages/redirectone/RedirectOne";
// import RedirectTwoPage from "./pages/redirectTow/RedirectTwoPage";
// import RedirectThreePage from "./pages/redirectThree/RedirectThreePage";
// import RedirectFourPage from "./pages/redirectFour/RedirectFourPage";
// import NotFound from "./pages/not-found/NotFound";

// function App() {
//   const { data } = useContext(DataContext);
//   const navigate = useNavigate();
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<Home />} />

//         <Route
//           exact
//           path="/coupon/:id"
//           element={
//             // loading ? (
//             <>
//               {data?.domain?.theme.name === "default_1" && <Coupon />}
//               {data?.domain?.theme.name === "default_2" && <Coupont />}
//               {data?.domain?.theme.name === "default_3" && <CouponThree />}
//               {data?.domain?.theme.name === "default_4" && <CouponFour />}
//               {!data?.domain?.theme.name && <CouponFour />}
//             </>
//             // ) : (
//             //   <Navigate to={`/${id}`} />
//             // )
//           }
//         />
//         <Route
//           exact
//           path="/:id"
//           element={
//             data?.domain?.theme.name === "default_1" &&
//             data?.data?.coupons?.fake_page === 1 ? (
//               <RedirectOne />
//             ) : data?.domain?.theme.name === "default_1" &&
//               data?.data?.coupons?.fake_page === 0 ? (
//               <Coupon />
//             ) : data?.domain?.theme.name === "default_2" &&
//               data?.data?.coupons?.fake_page === 1 ? (
//               <RedirectTwoPage />
//             ) : data?.domain?.theme.name === "default_2" &&
//               data?.data?.coupons?.fake_page === 0 ? (
//               <Coupont />
//             ) : data?.domain?.theme.name === "default_3" &&
//               data?.data?.coupons?.fake_page === 1 ? (
//               <RedirectThreePage />
//             ) : data?.domain?.theme.name === "default_3" &&
//               data?.data?.coupons?.fake_page === 0 ? (
//               <CouponThree />
//             ) : data?.domain?.theme.name === "default_4" &&
//               data?.data?.coupons?.fake_page === 1 ? (
//               <RedirectFourPage />
//             ) : data?.domain?.theme.name === "default_4" &&
//               data?.data?.coupons?.fake_page === 0 ? (
//               <CouponFour />
//             ) : (
//               <CouponFour />
//               // data?.domain?.theme.name === "default_2" ? <RedirectTwoPage/>
//               // :data?.domain?.theme.name === "default_3" ? <RedirectThreePage />
//               // :data?.domain?.theme.name === "default_4" ?<RedirectFourPage/>
//             )
//           }
//         />
//         <Route path={`*`} element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
