import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { showSuccess, showError, showConfirmation } from '../utils/notifications'

function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('creator')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error) {
          console.error('Error fetching creator:', error)
          navigate('/')
        } else {
          setCreator(data)
        }
      } catch (error) {
        console.error('Error:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchCreator()
  }, [id, navigate])

  const deleteCreator = async () => {
    const confirmed = await showConfirmation(
      'Delete Creator',
      'Are you sure you want to delete this creator? This action cannot be undone.'
    );
    
    if (confirmed) {
      try {
        const { error } = await supabase
          .from('creator')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error deleting creator:', error)
          showError('Error deleting creator')
        } else {
          showSuccess('Creator deleted successfully!')
          navigate('/')
        }
      } catch (error) {
        console.error('Error:', error)
        showError('Error deleting creator')
      }
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading creator...
        </div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Creator not found
          <br />
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <main className="container">
      <article className="single-creator">
        <header>
          <img 
            src={creator.imageURL || 'https://via.placeholder.com/800x400?text=No+Image'} 
            alt={creator.name}
            className="single-creator-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
            }}
          />
        </header>
        <main>
          <hgroup>
            <h1>{creator.name}</h1>
            <h2>Content Creator</h2>
          </hgroup>
          <p>{creator.description}</p>
        </main>
        <footer>
          <div role="group">
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer"
              role="button"
            >
              Visit Channel
            </a>
            <Link to={`/edit/${creator.id}`} role="button" className="secondary">
              Edit Creator
            </Link>
          </div>
          <div role="group">
            <button onClick={deleteCreator} className="outline contrast">
              Delete Creator
            </button>
            <Link to="/" role="button" className="outline">
              Back to Home
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}

export default ViewCreator