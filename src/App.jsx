import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
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
                title="DSSG x NYC"
                description="Pro Bono IT, Data and AI consulting for Non-Profits in New York City."
                type="website"
                name="DSSG x NYC"
              />
              <Home />
              <Projects />
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
