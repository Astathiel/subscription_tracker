import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function SubscriptionList({ session }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)

  // Function to fetch data
  const fetchSubscriptions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('renewal_date', { ascending: true }) // Sort by date

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setSubscriptions(data)
    }
    setLoading(false)
  }

  // Fetch when component loads
  useEffect(() => {
    fetchSubscriptions()
  }, [])

  // Calculate Total Monthly Cost
  const totalCost = subscriptions.reduce((sum, item) => sum + item.price, 0)

  if (loading) return <p>Loading your list...</p>

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Your Subscriptions</h3>
      
      {subscriptions.length === 0 ? (
        <p>No subscriptions found. Add one above!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #444', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Service</th>
              <th style={{ padding: '10px' }}>Cost</th>
              <th style={{ padding: '10px' }}>Renewal</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '10px' }}>{sub.name}</td>
                <td style={{ padding: '10px' }}>${sub.price.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{sub.renewal_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
        <strong>Total Monthly Cost: ${totalCost.toFixed(2)}</strong>
      </div>
    </div>
  )
}