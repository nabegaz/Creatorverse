import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { showSuccess, showError } from '../utils/notifications'

function AddCreator() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim() || !formData.description.trim() || !formData.url.trim()) {
      showError('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      console.log('Attempting to add creator:', formData) // Debug log
      
      const { error } = await supabase
        .from('creator')
        .insert([
          {
            name: formData.name.trim(),
            description: formData.description.trim(),
            url: formData.url.trim(),
            imageURL: formData.imageURL.trim() || null
          }
        ])
        .select()
      
      if (error) {
        console.error('Supabase error:', error) // Detailed error logging
        showError(`Error adding creator: ${error.message}`)
      } else {
        showSuccess('Creator added successfully!')
        navigate('/')
      }
    } catch (error) {
      console.error('Network or other error:', error) // Catch network errors
      showError(`Error adding creator: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <header>
        <hgroup>
          <h1>Add New Creator</h1>
          <h2>Share an amazing content creator with the world</h2>
        </hgroup>
      </header>
      
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">
            Name *
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter creator's name"
              required
            />
          </label>
          
          <label htmlFor="description">
            Description *
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what makes this creator special..."
              rows="4"
              required
            />
          </label>
          
          <label htmlFor="url">
            Channel/Website URL *
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://youtube.com/@creator"
              required
            />
          </label>
          
          <label htmlFor="imageURL">
            Image URL (optional)
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>
        </fieldset>
        
        <div role="group">
          <button type="submit" disabled={loading}>
            {loading ? 'Adding Creator...' : 'Add Creator'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}

export default AddCreator