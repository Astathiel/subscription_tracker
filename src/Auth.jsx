import { useState } from 'react'
import { supabase } from './supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Try to log in
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
        // If login fails, try to sign up instead (for simplicity in this hobby project)
        const { error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) alert(signUpError.message)
        else alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Welcome Back!</h2>
      <p>Sign in via Magic Link with your email below</p>
      <form onSubmit={handleLogin}>
        <input
          className="inputField"
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
        />
        <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
        />
        <br />
        <button disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Processing...' : 'Login / Sign Up'}
        </button>
      </form>
    </div>
  )
}