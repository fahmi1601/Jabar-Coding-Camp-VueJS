<template>
  <v-col md=3>
    <v-card>
      <v-img
        :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"
        class="white--text align-end"
        height="300px"
      >
      <v-card-title>{{ blog.title }}</v-card-title>
      </v-img>
      <v-card-text class="text--primary">
        <div>{{ blog.description.length > 15 ? blog.description.slice(0, 15) + ' ...' : blog.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="orange"
          text
          :to="'/blog/' + blog.id"
        >
          Read more
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
    data : () => ({
        apiDomain : 'https://demo-api-vue.sanbercloud.com'
    }),
    props : ['blog']
}
</script>