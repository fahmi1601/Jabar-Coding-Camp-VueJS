<template>
<v-app>
  <alert/>
  <loader/>

  <!-- Dialog delete data -->
  <v-dialog
    v-model="dialog2"
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">Yakin Mau dihapus ?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="removeData(idDelete)"
        >
        Iya
        </v-btn>

        <v-btn
          color="red darken-1"
          text
          @click="clearForm()"
        >
        Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Dialog Form Input -->
  <v-dialog
    v-model="dialog"
    max-width="500px"      
  >
          <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card >
      <v-toolbar
        color="primary"
        dark
      >
      {{ judul }}
      </v-toolbar>
      
      <v-card-text>
        
        <v-col cols="12">
   
          <v-text-field
           :rules="titleRules"
            label="Title"
            type="text"
            name="title"
            ref="title"
            required
            v-model="title"
            :disabled="buttonStatus == 'upload'"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
          required
            :disabled="buttonStatus == 'upload'"
            label="Description*"
             :rules="descriptionRules"
            type="text"
            name="description"
            ref="description"
            v-model="description"
          ></v-text-field>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <div v-if="buttonStatus == 'submit'">
          <v-btn
            color="blue darken-1"
            text
            @click="store" 
          >
          Save
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="clearForm"
          >
          Cancel
          </v-btn>
        </div>
        <div v-else-if="buttonStatus == 'update'">
          <v-btn
            color="blue darken-1"
            text
            @click="clearForm"
          >
          Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="UpdateBlog(idEdit)" 
          >
          Edit
          </v-btn>
        </div>
        <div v-else-if="buttonStatus == 'upload'">
          <input type="file" name="photo" ref="photo" accept="image/*">
          <v-btn 
            color="success"
            @click="uploadBlog(idUpload)"
          >
          Upload
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="clearForm"
          >
          Cancel
          </v-btn>
        </div>           
      </v-card-actions>
    </v-card>
  </v-form>
    
  </v-dialog>   
  <v-container class="ma-0 pa-0">
    <v-row>
      <v-col md="6">
        <v-subheader class="text-h5 text-left">
          Manage Blogs
        </v-subheader>
      </v-col>
      <v-col md="6">
        <div class="text-right">
          <v-btn small text  @click="addForm()" class="blue-text mt-3">
            Add Blog <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-simple-table width="300px" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              TITLE
            </th>
            <th class="text-left">
              DESCRIPTION
            </th>
            <th class="text-left">
              PHOTO
            </th>
            <th class="text-left">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="blog in blogs"
            :key="blog.id"
          >
            <td>{{ blog.id }}</td>
            <td>{{ blog.title }}</td>
            <td>{{ blog.description }}</td>
            <td><img width="100" :src="blog.photo ? apiDomain + blog.photo : 'https://th.bing.com/th/id/R.855e8ca01684f0d61e302ba09a177bfd?rik=TbKuqNR1U%2bV6Iw&riu=http%3a%2f%2ffremontgurdwara.org%2fwp-content%2fuploads%2f2020%2f06%2fno-image-icon-2.png&ehk=piUctuaeByVRg5s2YCzOsXApik4AfjUmmzMKA1cPKEs%3d&risl=&pid=ImgRaw&r=0'"  alt=""></td>
            <td> 
               <v-btn
                fab
                dark
                small
                color="success"
                class="mx-2"
                @click="editData(blog)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="blue-grey"
                fab
                small
                dark
                class="mx-2"
                @click="uploadPhoto(blog)"
              >
                <v-icon dark>mdi-cloud-upload</v-icon>
              </v-btn>
              <v-btn 
                fab
                dark
                small
                class="mx-2"
                color="error"
                @click="hapusDialog(blog)"
              >
                <v-icon dark>mdi-close-thick</v-icon>
              </v-btn>
            </td>          
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-layout wrap>
  
      <v-spacer></v-spacer>
 
    </v-layout>

    <v-pagination
      v-model="page"
      @input="go"
      :length="lengthPage"
      class="my-4"
      :total-visible="6"
      circle
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"> 
    </v-pagination>
  </v-container>

</v-app>

</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import Alert from '../components/Alert.vue';
import Loader from '../components/Loader.vue';
export default {
   components: { Alert,Loader },
    
      data:()=> ({
        valid: true,
        apiDomain:"https://demo-api-vue.sanbercloud.com",
        titleRules: [
        v => !!v || 'title is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 10) || 'Description must be less than 10 characters',
      ],
        blogs:[],
        page:0,
        lengthPage:0,
        perPage:0,
        idDelete:null,
        idUpload:null,
        idEdit:null,
        buttonStatus:'submit',
        errors:[],
        title:'',
        description:'',
        judul:'Tambah Blog',
        dialog:false,
        dialog2:false
      }),

      methods : {
       validate () {
        this.$refs.form.validate()
      
            this.setLoader({
              status: false
            })
      },
        store:function(){
           if( this.$refs.form.validate() ) {
                this.setLoader({
                    status: true
                })
          let formData = new FormData()
            formData.append('title', this.title)
            formData.append('description',this.description)

            const config = {
              method:"post",
              url : this.apiDomain + `/api/v2/blog`,
              data : formData,
              headers : {
                'Authorization' : 'Bearer' + this.token,
                Accept:'application/json'
              }
            }

            this.setLoader({
              status: true
            })

            this.axios(config)
            .then( (response)=> {
              this.setAlert({
                status: true,
                color: 'success',
                text: response.data.message,
              })
                          
              this.setLoader({
                  status: false
              })
              
              this.go()
              this.clearForm()
            })
            .catch( (error)=> {
              this.setAlert({
                status: true,
                color: 'error',
                text: error.data.message,
              })
              this.go()
            })
           }
        },

        uploadPhoto : function(blog) {
          this.title = blog.title
          this.description = blog.description
          this.idUpload = blog.id
          this.buttonStatus = "upload"
          this.judul="Upload Photo Blog"
          this.dialog = true
        },

        hapusDialog : function(blog) {
          this.idDelete=blog.id
          this.dialog2=true
        },

        editData : function(blog) {
          this.title = blog.title
          this.description = blog.description
          this.idEdit = blog.id
          this.buttonStatus = "update"
          this.judul="Edit Blog"
          this.dialog = true
          this.dialog2 = false
        },

        clearForm : function() {
          this.title = ""
          this.description = ""
          this.buttonStatus = "submit"
          this.judul="Tambah Blog"
          this.dialog=false
          this.dialog2=false
        },

        addForm : function() {
          this.title = ""
          this.description = ""
          this.buttonStatus = "submit"
          this.judul="Tambah Blog"
          this.dialog=true
          this.dialog2=false
        },

        UpdateBlog : function(idEdit) {
            if( this.$refs.form.validate() ) {
                this.setLoader({
                    status: true
                })
          let formData = new FormData()

          formData.append('title', this.title)
          formData.append('description',this.description)
          
          const config = {
            method:"post",
            url : this.apiDomain + `/api/v2/blog/${idEdit}`,
            params : { _method : "PUT" },
            data:formData,
            headers : {
              'Authorization' : 'Bearer' + this.token,
              Accept:'application/json'
            }
          }

          this.setLoader({
            status: true
          })
          
          this.axios(config)
          .then((response)=> {
            this.setAlert({
              status: true,
              color: 'success',
              text: response.data.message,
            })

            this.go()
            this.clearForm()

            this.setLoader({
              status: false
            })
          })
          .catch((error) => {
            this.setAlert({
              status: true,
              color: 'error',
              text: error.data.error,
            })
          })
            }
        },

        removeData : function(idDelete) {
          const config={
            method : "post",
            url : this.apiDomain + `/api/v2/blog/${idDelete}`,
            params : { _method : "DELETE" },
            headers : {
              'Authorization' : 'Bearer' + this.token,
            }   
        }
        
        this.setLoader({
          status: true
        })

        this.axios(config)
        .then( (response)=> {
          this.setAlert({
            status: true,
            color: 'success',
            text: response.data.message
          })
          
          this.setLoader({
            status: false
          })

          this.clearForm()
          this.go()
        })
        .catch( (error)=> {
          this.setAlert({
            status: true,
            color: 'error',
            text: error.data.error,
          })
        })
      },

      uploadBlog : function(idUpload) {
      //console.log(idUpload)
      let file = this.$refs.photo.files[0]
      let formData = new FormData()
      
      formData.append('photo' , file)

      const url = this.apiDomain + `/api/v2/blog/${idUpload}/upload-photo`;

      this.setLoader({
        status: true
      })
      
      this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer' + this.token,
        }
      })
      .then ((response)=>{
        this.setAlert({
          status: true,
          color: 'success',
          text: response.data.message,
        })
        
        this.setLoader({
          status: false
        })

        this.go()
        this.clearForm()
      })
      .catch((error)=>{
        this.setAlert({
          status: true,
          color: 'error',
          text: error.data.error,
        })
      })
    },
    go() {
      const config = {
        method : "get",
        url : this.apiDomain + "/api/v2/blog?page=" + this.page,
      }
      
      this.axios(config)
      .then(response=>{
        let {blogs}=response.data
        this.blogs=blogs.data
        this.page=blogs.current_page
        this.lengthPage=blogs.last_page
        this.perPage=blogs.per_page
      })
      .catch(error=>{
        this.setAlert({
          status: true,
          color: 'error',
          text: error.data.error,
        })
      });
    },
    ...mapActions({
      setAlert : 'alert/set',
      setToken : 'auth/setToken',
      setUser : 'auth/setUser',
      checkToken : 'auth/checkToken',
      setLoader : 'loader/set',
    })
  },
  mounted() {
    if(this.token) {
      this.checkToken(this.token)
    }
  },
  created(){
    this.go()
  },
  computed: {
    ...mapGetters({
      guest   : 'auth/guest',
      user    : 'auth/user',
      token   : 'auth/token'
    })
  },
}
</script>