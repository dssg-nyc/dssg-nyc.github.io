import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import ProjectFeature from './components/ProjectFeature';
import Projects from './components/Projects';
import Writing from './components/Writing';
import Book from './components/Book';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Seo from './components/Seo';

function App() {
  return (
      <div className="App">
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
              <Book />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
