<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          <router-link class="router-link" :to="{ name: 'Home' }">返 回</router-link>
          <router-link class="router-link" :to="{ name: 'Login' }">登 录</router-link>
        </p>
        <h2>重设密码</h2>
        <p>输入您的电子邮件重置密码</p>
        <div class="inputs">
          <div class="input">
            <input type="email" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">重 置</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import email from '@/assets/Icons/envelope-regular.svg'
import Modal from '../components/Modal'
import Loading from '../components/Loading'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'ForgotPassword',
  components: {
    email,
    Modal,
    Loading,
  },
  data: () => ({
    email: '',
    modalActive: false,
    modalMessage: '',
    loading: null,
  }),
  methods: {
    resetPassword() {
      this.loading = true
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = '如果您的帐户存在，您将收到一封电子邮件!'
          this.loading = false
          this.modalActive = true
        })
        .catch(err => {
          this.modalMessage = err.message
          this.loading = false
          this.modalActive = true
        })
    },
    closeModal() {
      this.modalActive = !this.modalActive
      this.email = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
