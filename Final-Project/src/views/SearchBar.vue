<template>
    <v-container class="ma-0 pa-0" grid-list-sm>
    <v-subheader class="text-h5">
      Search Result
    </v-subheader>
    <div v-if="!blogs.length" class="ml-4">
                Pencarian dengan kata kunci "{{queryComp}}" tidak ditemukan 
            </div>
            <div v-else class="ml-4 text-md-h4">
                Ditemukan {{filteredList.length}} blogs dengan judul pencarian "{{queryComp}}" 
            </div>
    <v-layout wrap>
      <blog-item-component
        v-for="blog in filteredList"
        :key="`blog-` + blog.id"
        :blog="blog"
      ></blog-item-component>
    </v-layout>
  </v-container>
</template>
<script>
import BlogItemComponent from '../components/BlogItemComponent.vue';
export default {

    data : () => ({
        apiDomain : 'https://demo-api-vue.sanbercloud.com',
        blogs : [],
        showSearch:null,
        total : 0,
    }),

    components : {
        'blog-item-component' : BlogItemComponent
    },

    computed: {
        
        //fungsi mengambil parameter query
        queryComp(){
            let searchQuery = this.$route.params.query
            return searchQuery
        },

        // fungsi filter data berdasarkan query
        filteredList() {
            let searchQuery = this.$route.params.query
            return this.blogs.filter(blog => {
                return blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            })
        }
    },
    methods : {
        //menghitung total data blog
        go() {
            const config = {
                method : 'get',
                url : this.apiDomain + '/api/v2/blog'
            };

            this.axios(config)
                .then(response => {
                let { total } = response.data.blogs
                this.total = total

                this.getAll()

                })
                .catch(error => {
                console.log(error);
                })

            },

        //menampilkan data random blog sejumlah {total}
        getAll(){
            const config={
                method:'get',
                url: this.apiDomain+ `/api/v2/blog/random/${this.total}`
            }
            this.axios(config)
            .then(response =>{
                let {blogs} = response.data
                this.blogs = blogs
                
            }).catch(error => console.log(error))
        }
    },
    created() {
        this.go()
    }
}
</script>