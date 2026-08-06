import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import ProjectFeature from './components/ProjectFeature';
import Projects from './components/Projects';
import Writing from './components/Writing';
import OpenSource from './components/OpenSource';
import Book from './components/Book';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Seo from './components/Seo';
import Events from './components/Events';
import DataDiplomats from './components/DataDiplomats';
import WorkMap from './components/workmap/WorkMap';
import ScrollToTop from './components/ScrollToTop';

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
              <About />
              <ProjectFeature />
              <Writing />
              <OpenSource />
              <Book />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/diplomats" element={<DataDiplomats />} />
          <Route path="/work-map" element={
            <>
              <Seo
                title="AI Human Work Map - NYC x DSSG"
                description="Explore where AI benchmark evidence lands across human jobs and skills. An interactive map of the economy by NYC x DSSG."
                type="website"
                name="AI Human Work Map"
              />
              <main className="wm-page">
                <div className="wm-page-head">
                  <h1>AI Human Work Map</h1>
                  <p>Explore where AI benchmark evidence lands across human jobs and their underlying skills. Pick a sector, focus a role, or click any role to inspect its evidence.</p>
                </div>
                <WorkMap />
                <p className="wm-page-note">Illustrative sample data — swap <code>src/data/workmap.json</code> for your own or public O*NET-derived data.</p>
              </main>
            </>
          } />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
