<template>
    <keep-alive>
        <v-dialog v-model="dialog" persistent transition="dialog-top-transition" max-width="500">
            <component :is="currentComponent" @closed="setDialogStatus"></component>
        </v-dialog>
    </keep-alive>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    components : {
        Login : () => import('./Login.vue'),
        Register : () => import('./Register.vue')
    },

    computed : {
        ...mapGetters({
            dialogStatus    : 'dialog/status',
            currentComponent : 'dialog/component',
        }),

        dialog : {
            get() {
                return this.dialogStatus
            },
            set(value) {
                this.dialogStatus(value)
            }
        }
    },

    methods : {
        ...mapActions({
            setDialogStatus : 'dialog/setStatus',
        }),
    }
}
</script>