import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Mock trading signals data
  const mockSignals = [
    {
      id: 1,
      pair: 'XAUUSD',
      type: 'BUY',
      entry: 1950.50,
      stopLoss: 1945.00,
      takeProfit: 1960.00,
      timestamp: new Date().toISOString(),
      confidence: 'High',
      risk: 'Medium'
    },
    {
      id: 2,
      pair: 'EURUSD',
      type: 'SELL',
      entry: 1.0850,
      stopLoss: 1.0880,
      takeProfit: 1.0800,
      timestamp: new Date().toISOString(),
      confidence: 'Medium',
      risk: 'Low'
    },
    {
      id: 3,
      pair: 'GBPUSD',
      type: 'BUY',
      entry: 1.2650,
      stopLoss: 1.2620,
      takeProfit: 1.2720,
      timestamp: new Date().toISOString(),
      confidence: 'High',
      risk: 'High'
    }
  ];
  
  res.status(200).json({ 
    signals: mockSignals,
    total: mockSignals.length,
    lastUpdated: new Date().toISOString()
  });
}