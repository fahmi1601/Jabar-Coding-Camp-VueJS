<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    :rules="emailRules"
                    v-model="email"
                    label="E-mail"
                    required
                    append-icon="mdi-email"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? `text` : `password`"
                    :rules="passwordRules"
                    label="Password"
                    required
                    counter
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        block
                        color="primary lighten-1"
                        @click="submit"
                    >Login
                        <v-icon right dark>mdi-lock-open</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            apiDomain: 'https://demo-api-vue.sanbercloud.com'
        }
    },
    methods : {
        ...mapActions({
            setAlert    : 'alert/set',
            setLoader   : 'loader/set',
            setToken    : 'auth/setToken'
        }),

        close() {
            this.$emit('closed', false)
        },
        
        submit() {
            if( this.$refs.form.validate() ) {
                this.setLoader({
                    status: true
                })
            const config = {
                method: "post",
                url: this.apiDomain + "/api/v2/auth/login",
                data: {
                    'email' : this.email,
                    'password' : this.password
                }
            }

            this.axios(config)
                .then( (response) => { 
                    this.setToken(response.data.access_token)

                    this.setAlert({
                        status : true,
                        color : 'success',
                        text : 'Login Berhasil',
                    })

                    this.setLoader({
                        status : false
                    })

                    this.$refs.form.resetValidation()
                    this.email = ''
                    this.password = ''
                    
                    this.close()
                })
                .catch( (response) => {
                    console.log(response)
                    this.setAlert({
                        status : true,
                        color : 'error',
                        text : 'Login Gagal'
                    })

                    this.setLoader({
                        status : false
                    })
                })
            }
        }
    }
}
</script>