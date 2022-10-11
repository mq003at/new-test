import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CSVClient from "./components/csv-components/CSVClient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>SPR-Kirppis</title>
        <meta name="description" content="Employee Management" />
      </Helmet>
      <Router>
        <Header navigation=""></Header>
        <Routes>
          <Route path="/csv/:shopId" element={<CSVClient />}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
