# Kenyan Political Analyst Project

A monorepo for political discourse insight & monitoring.

## Structure

- **frontend/** - React & TypeScript dashboard app (UI, filtering, charts, auth)
- **backend/** - Express/TypeScript API server (data feeds, proxy, business logic)

## Local Development

**Start Backend**
```bash
cd backend
npm install
npm start
```

**Start Frontend**
```bash
cd frontend
npm install
npm start
```

Frontend expects backend API running on localhost:4000.  
Modify API URLs in `src/services/dataApi.ts` for deployment needs.

## .env Usage
- Place API keys/secrets here (**DO NOT** commit secrets to GitHub).

**Example:**
```
REACT_APP_FIREBASE_API_KEY=your_frontend_firebase_key
TWITTER_API_KEY=your_backend_twitter_key
NEWS_API_KEY=your_backend_newsapi_key
PORT=4000
```

## Next Steps

- Implement backend integrations (Twitter/X, news, database).
- Build out frontend with components from upgrade PRs.
- Configure Firebase for authentication.
- Deploy both parts separately for production.

---

**For questions, see repository issues or contact project maintainers.**