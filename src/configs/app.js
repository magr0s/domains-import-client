const config = {
  FIREBASE_API: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/domains-import/us-central1/api'
    : '',

  API_VERSION: 'v1'
}

export default config
