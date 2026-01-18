import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'
import AddSubscription from './AddSubscription'
import SubscriptionList from './SubscriptionList'
import ProUpgrade from './ProUpgrade'
import './App.css'

function App() {
  const [session, setSession] = useState(null)

  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!session) return <Auth />

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Subscription Tracker</h1>
        <button onClick={() => supabase.auth.signOut()} style={{ padding: '5px 10px' }}>
          Sign Out
        </button>
      </div>
      
      <p>Welcome, {session.user.email}!</p>
      <hr />

      <AddSubscription 
        session={session} 
        onAdded={() => setRefreshTrigger(prev => prev + 1)} 
      />

      <hr style={{ margin: '30px 0', borderColor: '#444' }} />

      <SubscriptionList key={refreshTrigger} session={session} />
      
      <hr style={{ margin: '30px 0', borderColor: '#444' }} />
      <ProUpgrade />

    </div>
  )
}

export default App