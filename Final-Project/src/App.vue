<template>
 <!-- App.vue -->

<v-app>
  <alert/>
  <Dialog/>
  <Loader/>
  <v-navigation-drawer app v-model="drawer" color="blue-grey darken-4">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text text-h6 text-center">Jabar Coding Camp</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="blue-grey darken-2"></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="white--text">Accounts</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="!guest">
        <v-list-item-avatar>
          <v-img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://th.bing.com/th/id/OIP.Qe9KDnK2hz1b4fTAqSP-tgHaHa?pid=ImgDet&rs=1'"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="white--text text-h6">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="pa-2" v-if="guest">
        <v-btn block color="primary" class="mb-1" @click="login">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn block color="success" @click="register">
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </div>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="white--text">Menus</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(item, index) in menus"
        :key="`menu-` + index"
        :to="item.route"
        class="white--text"
        active-class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white" left>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
      <!-- Tampilan untuk item menu Manage Blogs -->
      <v-list-item
        to="/manage"
        class="white--text"
        active-class="white--text"
        v-if="!guest"
      >
        <v-list-item-icon>
          <v-icon color="white" left>mdi-file-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Manage Blogs</v-list-item-title>
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

  <v-app-bar app color="white">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Jabar Coding Camp</v-toolbar-title>
    <v-spacer></v-spacer>
    <SearchBar/>
  </v-app-bar>

  <v-main class="grey lighten-5">

    <v-container>
      <v-slide-y-transition>
        <router-view></router-view>
      </v-slide-y-transition>
    </v-container>
  </v-main>

  <v-footer class="text-center" color="black" app>
    <v-col class="text-center white--text">Copyright &copy; 2021 | JCC VueJS Kelompok 1</v-col>
  </v-footer>
</v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Alert from './components/Alert.vue';
import Loader from './components/Loader.vue';
import Dialog from './components/Dialog.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: { Alert, Dialog, Loader, SearchBar },
  
  data: () => ({
    drawer : true,
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

    //fungsi logout
    logout() {
      //konfigurasi API logout
      let config = {
        method: 'post',
        url: this.apiDomain + '/api/v2/auth/logout',
        headers: {
            'Authorization' : 'Bearer' + this.token,
        }
      }
      //tampilkan loader
      this.setLoader({
          status: true
      })

      this.axios(config)
        .then(() => {
            this.setToken('')
            this.setUser({})

            this.setAlert({
              status: true,
              color: 'success',
              text: 'Anda berhasil logout',
            })
            this.$router.push( { name: 'Home' })
            this.setLoader({
                status: false
            })
        })
        .catch((responses) => {
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.data.error,
            })

            this.setLoader({
                status: false
            })
        })
    },

    //fungsi login => menampilkan dialog login
    login() {
      this.setDialogComponent({'component' : 'login'})
    },

    //fungsi login => menampilkan dialog register
    register() {
      this.setDialogComponent({'component' : 'register'})
    },

    ...mapActions({
      setAlert : 'alert/set',
      setLoader : 'loader/set',
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
