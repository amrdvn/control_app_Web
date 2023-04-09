<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<style>
<style>
		body {
            margin: 0;
            padding: 0;
            background-color: #f6f8fa;
            font-family: Arial, sans-serif;
            overflow-x: hidden;
        }

        .container {
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
        }

        .form {
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            padding: 40px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .form h1 {
            margin: 0 0 20px 0;
            font-size: 24px;
            font-weight: 600;
            color: #4a4a4a;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .form input[type="text"], 
        .form input[type="password"], 
        .form input[type="email"] {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #f2f2f2;
            margin-bottom: 20px;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 14px;
        }

        .form input[type="submit"] {
            background-color: #1a8cff;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            width: 100%;
        }

        .form input[type="submit"]:hover {
            background-color: #0d6aad;
        }

        .form span {
            font-size: 14px;
            color: #777;
            margin-top: 10px;
        }

        .form a {
            color: #1a8cff;
            text-decoration: none;
            font-size: 14px;
            margin-top: 10px;
        }

        .footer {
            background-color: #e9ecef;
            color: #4a4a4a;
            text-align: center;
            padding: 20px;
            font-size: 14px;
            position: absolute;
            bottom: 0;
            width: 100%;
        }

        .form span.warning {
            color: #ff0000;
            margin-top: 10px;
            font-size: 15px;
            text-align: center;
        }

        .error {
            position: absolute;
            font-size: 18px;
            color: #dc3545;
            background-color: #ffdddd;
            padding: 5px;
            border-radius: 5px;
        }

        .error.top {
            bottom: 100px;
        }

        .error.bottom {
            bottom: -40px;
        }
	</style>
</style>
<script>
export default {
  name: 'IndexPage',
}
</script>
