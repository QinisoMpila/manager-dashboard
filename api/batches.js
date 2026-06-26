// Vercel Backend Function: api/batches.js
// This securely handles Supabase calls from the frontend

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Supabase credentials (safe on server side)
  const SUPABASE_URL = 'https://wxjchdcohsuhyeokzmtd.supabase.co';
  const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4amNoZGNvaHN1aHllb2t6bXRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTA4NTAxMywiZXhwIjoyMDk2NjYxMDEzfQ.UqbBsT5qYvajQtly3cy0BKm3sWWNFoY8sis4bWncI18';

  try {
    if (req.method === 'GET') {
      // Fetch batches
      const response = await fetch(`${SUPABASE_URL}/rest/v1/batches`, {
        method: 'GET',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Supabase error: ${response.status}`);
      }

      const batches = await response.json();
      return res.status(200).json(batches);
    }

    if (req.method === 'PATCH') {
      // Update batch status
      const { batchId, status } = req.body;

      if (!batchId || !status) {
        return res.status(400).json({ error: 'Missing batchId or status' });
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/batches?id=eq.${batchId}`, {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Supabase error: ${response.status}`);
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
