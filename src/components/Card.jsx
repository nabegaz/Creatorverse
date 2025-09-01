import React from 'react'
import { Link } from 'react-router-dom'

function Card({ id, name, url, description, imageURL }) {
  return (
    <article className="creator-card">
      <header>
        <img 
          src={imageURL || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={name} 
          className="creator-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
      </header>
      <main>
        <h3>{name}</h3>
        <p>{description}</p>
      </main>
      <footer className="creator-actions">
        <div role="group">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            role="button"
            className="secondary"
          >
            Visit Channel
          </a>
          <Link to={`/creator/${id}`} role="button">
            View Details
          </Link>
        </div>
        <Link to={`/edit/${id}`} role="button" className="outline">
          Edit
        </Link>
      </footer>
    </article>
  )
}

export default Card