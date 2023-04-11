export default async ({ app }) => {
    const firebaseConfig = {
      // Firebase yapılandırma bilgilerinizi buraya ekleyin.
    }
  
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  
    try {
      const messaging = firebase.messaging()
      await messaging.requestPermission()
      const token = await messaging.getToken()
      console.log('Token:', token)
    } catch (error) {
      console.error('Bildirim gönderilemedi:', error)
    }
  
    app.firebase = firebase
  }
  