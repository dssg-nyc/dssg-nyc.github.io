import { Link } from 'react-router-dom';
import Seo from './Seo';
import blogData from '../data/blogs.json';
import './Blog.css';

const Blog = () => {
  return (
    <>
      <Seo
        title="NYC x DSSG | Blog"
        description="Notes on data science, civic tech, and building for social good from the NYC x DSSG community."
        type="website"
        name="NYC x DSSG"
      />
      <div className="blog-container">
        <p className="eyebrow">Notes & writing</p>
        <h1>Blog</h1>
        {blogData.map((post) => (
          <article id={post.id} key={post.id} className="blog-post-summary">
            <h2>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default Blog;