<template>
  <div class="content">
    <h1>Uygulama Kısıtı Ekle</h1>

    <table>
      <thead>
        <tr>
          <th>Uygulama Adı</th>
          <th>Durum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(app, index) in apps" :key="index">
          <td>{{ app.name }}</td>
          <td>
            <button @click="toggleAppStatus(app)">{{ app.isActive ? 'Aktif' : 'Pasif' }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apps: [
        { name: 'com.google.android.apps.nexuslauncher', isActive: true },
        { name: 'com.google.android.apps.nexuslauncher', isActive: false },
        { name: 'com.google.android.apps.nexuslauncher', isActive: true },
      ],
    };
  },
  methods: {
    toggleAppStatus(app) {
      app.isActive = !app.isActive;
    },
  },
};
</script>

<style>
  /* stilleri buraya ekleyin */
</style>
