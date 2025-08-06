import { PropTypes } from 'prop-types';
import './Card.css';

const Card = ({ project }) => (
  <div className="modern-card">
    <div className="card-content">
      {project.img && (
        <div className="card-image">
          <img src={`/images/${project.img}`} alt={project.title} />
        </div>
      )}
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <div className="card-footer">
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="button card-button"
          >
            {project.buttonText || 'Learn More'}
          </a>
        </div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Card;