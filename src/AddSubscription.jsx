import { useState } from 'react'
import { supabase } from './supabase'

// Notice we added 'onAdded' to the list of tools this component receives
export default function AddSubscription({ session, onAdded }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const newSubscription = {
      name: name,
      price: parseFloat(price),
      renewal_date: date,
      user_id: session.user.id 
    }

    const { error } = await supabase
      .from('subscriptions')
      .insert([newSubscription])

    if (error) {
      console.error('Error adding subscription:', error)
      setMessage('❌ Error adding subscription.')
    } else {
      setMessage('✅ Subscription added!')
      setName('')
      setPrice('')
      setDate('')
      
      // THIS IS THE NEW PART:
      // It tells the parent (App.jsx) "I'm done, please refresh the list!"
      if (onAdded) {
        onAdded()
      }
    }
    setLoading(false)
  }

  return (
    <div style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px 0' }}>
      <h3>Add New Subscription</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Service Name:</label><br/>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. Netflix" 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Monthly Cost ($):</label><br/>
          <input 
            type="number" 
            step="0.01" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="15.99" 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Renewal Date:</label><br/>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button disabled={loading} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Saving...' : 'Add Subscription'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}