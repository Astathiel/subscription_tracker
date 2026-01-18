export default function ProUpgrade() {
  // PASTE YOUR LINK HERE!
  const STRIPE_LINK = "https://buy.stripe.com/test_5kQ28k3nt6XA2Wxfpv0gw00" 

  return (
    <div style={{ 
      backgroundColor: '#635BFF', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      textAlign: 'center',
      marginTop: '20px'
    }}>
      <h3>🚀 Upgrade to Pro</h3>
      <p>Get unlimited tracking and advanced charts.</p>
      
      <a 
        href={STRIPE_LINK} 
        target="_blank" 
        rel="noreferrer"
        style={{
          display: 'inline-block',
          backgroundColor: 'white',
          color: '#635BFF',
          padding: '10px 20px',
          marginTop: '10px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Go Pro - $5/mo
      </a>
    </div>
  )
}