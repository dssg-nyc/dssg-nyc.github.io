import { Route, Routes } from 'react-router-dom';
import './App.css';
import useReveal from './hooks/useReveal';
import Ticker from './components/Ticker';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Directory from './components/Directory';
import ProjectFeature from './components/ProjectFeature';
import Writing from './components/Writing';
import Book from './components/Book';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Seo from './components/Seo';
import Events from './components/Events';
import DataDiplomats from './components/DataDiplomats';
import ScrollToTop from './components/ScrollToTop';
import SegmentModal from './components/SegmentModal';

function App() {
  useReveal();

  return (
    <div className="App">
      <ScrollToTop />
      <Ticker />
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Seo
                  title="NYC x DSSG - Data Science for Social Good"
                  description="Pro Bono IT, Data and AI consulting for Non-Profits in New York City. Connect with skilled professionals making a difference through technology."
                  type="website"
                  name="NYC x DSSG"
                />
                <Home />
                <About />
                <Directory />
                <ProjectFeature />
                <Writing />
                <Book />
              </>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/diplomats" element={<DataDiplomats />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
      <Footer />
      <SegmentModal />
    </div>
  );
}

export default App;
