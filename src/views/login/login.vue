<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NButton, NForm, NFormItemRow, NInput, NTabPane, NTabs } from 'naive-ui'
import { fetchHadLogin, fetchLogin, fetchReg } from '@/api/login'
interface ModelType {
  email: string | null
  password: string | null
  password2: string | null
}

interface ErrorType {
  login: string | null
  reg: string | null
}

export default defineComponent({
  components: {
    NButton, NInput, NForm, NTabs, NTabPane, NFormItemRow,
  },

  data() {
    const modelRef = ref<ModelType>({
      email: null,
      password: null,
      password2: null,
    })

    const error = ref<ErrorType>({
      login: null,
      reg: null,
    })

    return {
      error,
      model: modelRef,

    }
  },
  mounted() {
    // console.log('mounted')
    // const checkFn = async () => {
    //   const data = await fetchHadLogin()

    //   // .then(() => {
    //   //   // debugger
    //   console.log(`fetchHadLogin${data}`)
    // }
    fetchHadLogin().then((response) => {
      this.$router.push('/chat/213')
    }).then((todo) => {
      console.log(todo)
    }).catch((error) => {
      console.error(error)
    })

    //   this.$router.push('/chat/213')
    // })
  },
  methods: {
    login(e: any): void {
      const mail = this.model.email
      const pass = this.model.password
      if (mail == null || mail.length > 16 || mail.length < 6) {
        this.error.login = '请输入正确的邮箱'
        return
      }

      if (pass == null || pass.length < 6 || pass.length > 16) {
        this.error.login = '密码格式有误,密码需要6到16位,包含大小写符合数字'
        return
      }

      fetchLogin({ email: mail, password: pass }).then(() => {
        this.$router.push('/chat/213')
      })
    },
    handleSubmit() {
      // 处理表单数据...

      // 导航到成功页面
      this.$router.push({ name: 'Success' })
    },
    reg(e: any): void {
      const mail = this.model.email
      const pass = this.model.password
      const pass2 = this.model.password2
      if (mail == null || mail.length > 16 || mail.length < 6) {
        this.error.reg = '请输入正确的邮箱'
        return
      }

      if (pass == null || pass.length < 6 || pass.length > 16) {
        this.error.reg = '密码格式有误,密码需要6到16位,包含大小写符合数字'
        return
      }

      if (pass !== pass2) {
        this.error.reg = '两次密码不一致'
        return
      }
      fetchReg({ email: mail, password: pass }).then(() => {
        this.$router.push('/chat/213')
      })
    },
    inputChange(): void {
      this.error.login = null
      this.error.reg = null
    },
  },
})
</script>

<template>
  <div class="flex flex-col w-full h-full login-page">
    <div class="login-wrap">
      <div class="title">
        人工智能聊天机器人
      </div>
      <NTabs
        class="card-tabs "
        default-value="signin"
        size="large"
        animated
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <NTabPane name="signin" tab="登录">
          <NForm>
            <NFormItemRow label="邮箱">
              <NInput v-model:value="model.email" @input="inputChange" />
            </NFormItemRow>
            <NFormItemRow label="密码">
              <NInput
                v-model:value="model.password"
                type="password"
                show-password-on="mousedown"
                placeholder="密码"
                :minlength="6"
                :maxlength="16"
                @input="inputChange"
              />
            </NFormItemRow>
          </NForm>
          <div v-if="error.login" class="error">
            {{ error.login }}
          </div>
          <NButton type="primary" block primary strong @click="login">
            登录
          </NButton>
        </NTabPane>
        <NTabPane name="signup" tab="注册">
          <NForm>
            <NFormItemRow label="邮箱">
              <NInput v-model:value="model.email" @input="inputChange" />
            </NFormItemRow>
            <NFormItemRow label="密码">
              <NInput
                v-model:value="model.password"
                type="password"
                show-password-on="mousedown"
                placeholder="密码"
                :minlength="6"
                :maxlength="16"
                @input="inputChange"
              />
            </NFormItemRow>
            <NFormItemRow label="重复密码">
              <NInput
                v-model:value="model.password2"
                type="password"
                show-password-on="mousedown"
                placeholder="密码"
                :minlength="6"
                :maxlength="16"
                @input="inputChange"
              />
            </NFormItemRow>
          </NForm>
          <div v-if="error.reg" class="error">
            {{ error.reg }}
          </div>
          <NButton type="primary" block primary strong @click="reg">
            注册
          </NButton>
        </NTabPane>
      </NTabs>
      <!-- {{ model.email }} -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  .title{
    font-size: 2rem;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  .error{
    color: red;
  }
}
  .login-wrap{
    width: 50rem;
    height: auto;
    margin-top: -10rem;
  }
</style>
