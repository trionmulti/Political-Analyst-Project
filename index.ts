import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Route endpoints (expand with controllers/services as needed)
app.get('/', (req, res) => res.send('API Backend running...'));

// Example endpoint: Twitter mentions
app.get('/api/twitter-mentions', async (req, res) => {
  // TODO: Wire up Twitter/X API integration
  res.json([]);
});

// Example endpoint: News headlines
app.get('/api/news-headlines', async (req, res) => {
  // TODO: Integrate with actual news API (NewsAPI.org, MediaStack, custom)
  res.json([]);
});

// Example endpoint: Key figures
app.get('/api/key-figures', async (req, res) => {
  // TODO: Connect to database/scraper for real data
  res.json([]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));