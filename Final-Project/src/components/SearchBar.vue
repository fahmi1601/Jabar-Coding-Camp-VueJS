<template>
    <div class="subtitle-1 mt-7">
        <v-text-field
            name="search"
            label="Search"
            placeholder="Press Enter to search"
            solo
            rounded
            v-model="search"
            append-icon="mdi-magnify"
            v-on:keyup.enter="callComponent"
        ></v-text-field>
    </div>
</template>
<script>
export default{
    name: 'SearchBar',
    data() {
        return{
            search: '',
            blogs: [],
            path: `/search`,
            domain: 'https://demo-api-vue.sanbercloud.com',
            page: 0
        }
    },
    methods: {
        callComponent() {
            if (this.$route.path !== this.path) {
                this.$router.push(`/search/${this.search}`)
                this.search = ''
            }
        }
    }
}
</script>