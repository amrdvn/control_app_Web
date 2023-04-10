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
        <tr>
          <td>com.google.android.apps.nexuslauncher</td>
          <td>
            <button class="active"></button>
          </td>
        </tr>
        <tr>
          <td>com.google.android.apps.nexuslauncher</td>
          <td>
            <button class="inactive"></button>
          </td>
        </tr>
        <tr>
          <td>com.google.android.apps.nexuslauncher</td>
          <td>
            <button class="active"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  outline: none;
}

.active {
  background-color: green;
}

.inactive {
  background-color: red;
}
</style>
