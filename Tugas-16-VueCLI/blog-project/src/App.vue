<template>
 <!-- App.vue -->

<v-app>
  <alert/>
  <Dialog/>
  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <v-list-item v-if="!guest">
        <v-list-item-avatar>
          <v-img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://randomuser.me/api/portraits/men/78.png'"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="pa-2" v-if="guest">
        <v-btn block color="primary" class="mb-1" @click="login">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn block color="success">
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </div>

      <v-divider></v-divider>

      <v-list-item
        v-for="(item, index) in menus"
        :key="`menu-` + index"
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon left>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
    
    <template v-slot:append v-if="!guest">
      <div class="pa-2">
        <v-btn block color="red" dark @click="logout">
          <v-icon left>mdi-lock</v-icon>
          Logout
        </v-btn>
      </div>
    
    </template>

  </v-navigation-drawer>

  <v-app-bar app color="Success" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Jabar Coding Camp</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-main>

    <v-container fluid>
      <v-slide-y-transition>
        <router-view></router-view>
      </v-slide-y-transition>
    </v-container>
  </v-main>

  <v-footer app>
    Copyright &copy; 2021 | Fahmi Adzan Yanuar
  </v-footer>
</v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Alert from './components/Alert.vue';
import Dialog from './components/Dialog.vue';

export default {
  name: 'App',
  components: { Alert, Dialog },
  
  data: () => ({
    drawer : false,
    menus : [
      { title : 'Home', icon : 'mdi-home', route : '/' },
      { title : 'Blogs', icon : 'mdi-note', route : '/blogs' },
    ],
    apiDomain: 'https://demo-api-vue.sanbercloud.com',
  }),
  computed: {
    ...mapGetters({
      guest   : 'auth/guest',
      user    : 'auth/user',
      token   : 'auth/token'
    })
  },
  methods : {
    logout() {
      let config = {
        method: 'post',
        url: this.apiDomain + '/api/v2/auth/logout',
        headers: {
            'Authorization' : 'Bearer' + this.token,
        }
    }
    this.axios(config)
        .then(() => {
            this.setToken('')
            this.setUser({})

            this.setAlert({
              status: true,
              color: 'success',
              text: 'Anda berhasil logout',
            })
        })
        .catch((responses) => {
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.data.error,
            })
        })
    },

    login() {
      this.setDialogComponent({'component' : 'login'})
    },
    ...mapActions({
      setAlert : 'alert/set',
      setDialogComponent : 'dialog/setComponent',
      setToken : 'auth/setToken',
      setUser : 'auth/setUser',
      checkToken : 'auth/checkToken',
    })
  },
  mounted() {
    if(this.token) {
      this.checkToken(this.token)
    }
  }
};
</script>
