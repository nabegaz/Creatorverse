import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { showSuccess, showError, showConfirmation } from '../utils/notifications'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: ''
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

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
          showError('Creator not found')
          navigate('/')
        } else {
          setFormData({
            name: data.name || '',
            description: data.description || '',
            url: data.url || '',
            imageURL: data.imageURL || ''
          })
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
      setUpdating(true)
      const { error } = await supabase
        .from('creator')
        .update({
          name: formData.name.trim(),
          description: formData.description.trim(),
          url: formData.url.trim(),
          imageURL: formData.imageURL.trim() || null
        })
        .eq('id', id)
      
      if (error) {
        console.error('Error updating creator:', error)
        showError('Error updating creator. Please try again.')
      } else {
        showSuccess('Creator updated successfully!')
        navigate(`/creator/${id}`)
      }
    } catch (error) {
      console.error('Error:', error)
      showError('Error updating creator. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

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

  return (
    <main className="container">
      <header>
        <hgroup>
          <h1>Edit Creator</h1>
          <h2>Update the creator's information</h2>
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
          <button type="submit" disabled={updating}>
            {updating ? 'Updating...' : 'Update Creator'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/creator/${id}`)} 
            className="secondary"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={deleteCreator} 
            className="outline contrast"
          >
            Delete Creator
          </button>
        </div>
      </form>
    </main>
  )
}

export default EditCreator