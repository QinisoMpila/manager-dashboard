// Vercel Backend Function: api/transactions.js
// Fetches transaction details for a batch

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Supabase credentials (safe on server side)
  const SUPABASE_URL = 'https://wxjchdcohsuhyeokzmtd.supabase.co';
  const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4amNoZGNvaHN1aHllb2t6bXRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTA4NTAxMywiZXhwIjoyMDk2NjYxMDEzfQ.UqbBsT5qYvajQtly3cy0BKm3sWWNFoY8sis4bWncI18';

  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ error: 'Missing ids parameter' });
    }

    // ids comes as comma-separated string from query param
    const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions?id=in.(${ids})`, {
      method: 'GET',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }

    const transactions = await response.json();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
