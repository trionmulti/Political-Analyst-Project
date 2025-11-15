// Services to interface with backend endpoints

export async function fetchTwitterMentions() {
  const res = await fetch('http://localhost:4000/api/twitter-mentions');
  return res.json();
}

export async function fetchNewsHeadlines(dateString: string) {
  const res = await fetch(`http://localhost:4000/api/news-headlines?date=${dateString}`);
  return res.json();
}

export async function fetchKeyFigures() {
  const res = await fetch('http://localhost:4000/api/key-figures');
  return res.json();
}