import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Writing from './components/Writing';
import Book from './components/Book';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Seo from './components/Seo';
import Events from './components/Events';
import DataDiplomats from './components/DataDiplomats';
import Portfolio from './components/Portfolio';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiePolicy from './components/legal/CookiePolicy';
import AiPolicy from './components/legal/AiPolicy';

function App() {
  return (
      <div className="App">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Seo
                title="NYC x DSSG - Data Science for Social Good"
                description="Pro Bono IT, Data and AI consulting for Non-Profits in New York City. Connect with skilled professionals making a difference through technology."
                type="website"
                name="NYC x DSSG"
              />
              <Home />
              <Projects />
              <Writing />
              <Book />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/diplomats" element={<DataDiplomats />} />
          <Route path="/events" element={<Events />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/ai-policy" element={<AiPolicy />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
  );
}

export default App;
