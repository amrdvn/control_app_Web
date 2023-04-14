<template>
  <div>
    <h1>Send Notification</h1>
    <form @submit.prevent="sendNotification">
      <label for="title">Title:</label><br>
      <input type="text" id="title" name="title" v-model="notification.title"><br><br>
      <label for="body">Body:</label><br>
      <textarea id="body" name="body" v-model="notification.body"></textarea><br><br>
      <label for="token">Token:</label><br>
      <input type="text" id="token" name="token" v-model="notification.token"><br><br>
      <button type="submit">Send Notification</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      notification: {
        title: '',
        body: '',
        token: ''
      }
    };
  },
  methods: {
    sendNotification() {
      const config = {
        headers: {
          'Authorization': 'Bearer AAAAMGjPLwc:APA91bHSArapukUu4ZTeZrMTrrhrNcCuZ7aMaW0k_8o4bUmDNSdl5E2lLM_RYl0ReQ-QtNFuRWUsfT3GXbmmGtP6AMyK2xXzZEFbOiFQa0ZLyBB7F1q0WAgaQs7uCKM_N0Lq_EsJ-2IH',
          'Content-Type': 'application/json'
        }
      };
      const message = {
        message: {
          notification: {
            title: this.notification.title,
            body: this.notification.body
          },
          token: this.notification.token
        }
      };
      axios.post('https://fcm.googleapis.com/v1/projects/control-app-a014e/messages:send', message, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
