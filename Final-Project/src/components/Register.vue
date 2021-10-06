<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
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
                <v-text-field
                    :rules="nameRules"
                    v-model="name"
                    label="Name"
                    required
                    append-icon="mdi-account"
                ></v-text-field>
                <div>
                    <v-card class="d-flex mb-6" outlined>
                        <input type="file" ref="photo" class="block" @change="checkFIle" accept="image/*" />
                        <v-spacer />
                        <v-icon>mdi-camera</v-icon>
                    </v-card>
                    <div class="v-text-field__details" style="margin-top: -20px" v-if="errorUpload" >
                        <div class="v-messages theme--light">
                            <div class="v-messages__wrapper">
                                <div class="v-messages__message"><span style="color: red">{{ errorUpload }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        block
                        color="primary lighten-1"
                        @click="submit"
                    >Submit
                    <v-icon right dark>mdi-check-circle</v-icon>
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
            //validasi email
            emailRules: [
                v => !!v || 'E-mail harus diisi',
                v => /.+@.+\..+/.test(v) || 'E-mail harus valid',
            ],
            showPassword: false,
            password: '',
            //validasi password
            passwordRules: [
                v => !!v || 'Password harus diisi',
                v => (v && v.length >= 8) || 'Minimal 8 karakter',
            ],
            name: '',
            //validasi nama
            nameRules: [
                v => !!v || 'Nama harus diisi',
            ],
            errorUpload: '',
            apiDomain: 'https://demo-api-vue.sanbercloud.com'
        }
    },
    methods : {
        ...mapActions({
            setAlert    : 'alert/set',
            setLoader   : 'loader/set'
        }),

        //fungsi untuk cek file apakah sizenya diatas 1Mb
        checkFIle() {
            let filePhoto = this.$refs.photo.files[0];
            this.errorUpload = ''

            if(filePhoto) {
                let sizePhoto = filePhoto.size;
                if(sizePhoto > 1000000) {
                    this.errorUpload = 'Size file maksimal 1Mb'
                }
            }
        },

        close() {
            this.$emit('closed', false)
        },
        
        submit() {
            if( this.$refs.form.validate() && this.errorUpload === '' ) {
                let formData = new FormData()
                let file = this.$refs.photo.files[0];

                formData.append('email', this.email)
                formData.append('password', this.password)
                formData.append('name', this.name)
                formData.append('photo_profile', file)

                const config = {
                    method: "post",
                    url: this.apiDomain + "/api/v2/auth/register",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                }

                this.setLoader({
                    status: true
                })

                this.axios(config)
                .then( (response) => { 

                    this.setAlert({
                        status: true,
                        'color': 'success',
                        'text': response.data.message,
                    })
                    
                    this.$refs.form.resetValidation()
                    this.email = ''
                    this.password = ''
                    this.name = ''
                    
                    this.setLoader({
                        status: false
                    })

                    this.close()
                })
                .catch( (response) => {
                    console.log(response)
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: 'Register gagal'
                    })

                    this.setLoader({
                        status: false
                    })
                })
            }
        }
    }
}
</script>