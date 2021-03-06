<template>
  <v-container class="settings-container">
    <v-expansion-panel class="settings-panel">
        <v-expansion-panel-content value="true">
            <div slot="header">Profile</div>
            <div class="settings-panel-content text-xs-left">
                <div class="settings-image">
                    <img class="settings-image" :src="avatar">
                    <div class="text-xs-center">
                        <v-btn small class="main-color settings-avatar-btn" :loading="uploadingAvatar" :disabled="uploadingAvatar">
                            <v-icon class="white--text">save</v-icon>
                            Changer d'Avatar
                            <input type="file" @change="changeAvatar">
                        </v-btn>
                    </div>
                </div>
                <v-text-field
                    class="settings-bio"
                    label="Bio"
                    multi-line
                ></v-text-field>
                <v-menu
                    lazy
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    :nudge-left="40"
                    class="settings-born"
                >
                    <v-text-field
                        slot="activator"
                        label="Date de naissance"
                        v-model="born"
                        prepend-icon="event"
                        readonly
                    ></v-text-field>
                    <v-date-picker v-model="born" no-title scrollable actions>
                        <template slot-scope="{ save, cancel }">
                        <div class="v-card__actions">
                            <v-btn flat color="primary" @click.native="cancel()">Cancel</v-btn>
                            <v-btn flat color="primary" @click.native="save()">Save</v-btn>
                        </div>
                        </template>
                    </v-date-picker>
                </v-menu>
                <div class="text-xs-right">
                    <v-btn class="main-color">
                        Enregistrer
                        <v-icon right class="white--text">save</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header">Amis</div>
            Lol
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <div slot="header">Autres</div>
            Lol
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import { VExpansionPanel, VBtn, VIcon, VTextField, VDatePicker, VMenu, VProgressCircular } from 'vuetify/es5/components'
import VExpansionPanelContent from 'vuetify/es5/components/VExpansionPanel/VExpansionPanelContent'
import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
import gql from 'graphql-tag'

export default {
    data() {
        return {
            born: '',
            uploadingAvatar: false
        }
    },
    components: {
        VExpansionPanel,
        VExpansionPanelContent,
        VProgressCircular,
        VBtn,
        VIcon,
        VTextField,
        VDatePicker,
        VMenu,
        VContainer,
        VFlex,
        VLayout
    },
    methods: {
        changeAvatar({ target: { files: [file] }}) {
            this.uploadingAvatar = true
            this.$apollo.mutate({
                mutation: gql`mutation ($file: Upload!) {
                    setAvatar(file: $file) {
                        error
                    }
                }`,
                variables: {
                    file
                }
            }).then((data) => {
                console.log(data)
                this.$apollo.queries.avatar.refetch()
            }).catch(e => console.error(e))
            .then(_ => this.uploadingAvatar = false)
        }
    },
    apollo: {
        avatar: {
            query: gql`{ me { avatar } }`,
            update: ({ me: { avatar }}) => avatar
        }
    },
}
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .settings-image {
      width: 175px;

      & > img {
          height: 175px;
          width: 175px;
      }
  }

  .settings-panel {
      &-content {
          padding: 20px;
      }
  }

  .settings-avatar-btn
  {
    margin: 0;
    margin-bottom: 25px;

    & > .btn__content {
      font-size: 12px;
      padding: 0 5px;
    }

    .icon {
        font-size: 20px;
        padding-right: 5px;
        width: 20px;
        height: 20px;
    }

    input[type=file] {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      outline: none;
      cursor: inherit;
      display: block;
    }
  }

  .settings-bio {
      width: 40% !important;
  }

  .settings-born {
      width: 200px !important;
  }
</style>
