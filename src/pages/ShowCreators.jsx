import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'
import TestConnection from '../components/TestConnection'

function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCreators()
  }, [])

  const fetchCreators = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creator')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching creators:', error)
      } else {
        setCreators(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading creators...
        </div>
      </div>
    )
  }

  return (
    <main className="container">
      <header>
        <hgroup>
          <h1>CreatorVerse</h1>
          <h2>Discover amazing content creators</h2>
        </hgroup>
        <Link to="/add" role="button">
          Add New Creator
        </Link>
      </header>
      
      {creators.length === 0 ? (
        <section className="no-creators">
          <h2>No creators found</h2>
          <p>Be the first to add a content creator to the CreatorVerse!</p>
          <Link to="/add" role="button">
            Add First Creator
          </Link>
          <TestConnection />
        </section>
      ) : (
        <section className="creators-grid">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default ShowCreators