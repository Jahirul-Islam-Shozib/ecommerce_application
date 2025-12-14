export const environment = {
  production: true,
  apiBaseUrl: 'http://172.16.234.51:8092',  // 🔥 Docker/prod এ যেটা থাকবে
  firebase: {
    apiKey: 'your-prod-key',
    authDomain: 'your-prod.firebaseapp.com',
    projectId: 'your-prod',
    storageBucket: 'your-prod.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  },
};
