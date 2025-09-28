export const environment = {
  production: true,
  apiBaseUrl: 'https://api.yourdomain.com',  // 🔥 Docker/prod এ যেটা থাকবে
  firebase: {
    apiKey: 'your-prod-key',
    authDomain: 'your-prod.firebaseapp.com',
    projectId: 'your-prod',
    storageBucket: 'your-prod.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  },
};
