<template>
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="email" label="邮箱">
        <n-input v-model:value="model.email" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="model.password"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="重复密码"
      >
        <n-input
          v-model:value="model.reenteredPassword"
          :disabled="!model.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :disabled="model.email === null"
              round
              type="primary"
              @click="handleValidateButtonClick"
            >
              登录/注册
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>


  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import {
    FormInst,
    FormItemInst,
    FormItemRule,
    useMessage,
    FormRules
  } from 'naive-ui'
  
  interface ModelType {
    email: string | null
    password: string | null
    reenteredPassword: string | null
  }
  
  export default defineComponent({
    setup () {
      const formRef = ref<FormInst | null>(null)
      const rPasswordFormItemRef = ref<FormItemInst | null>(null)
      const message = useMessage()
      const modelRef = ref<ModelType>({
        email: null,
        password: null,
        reenteredPassword: null
      })
      function validatePasswordStartWith (
        rule: FormItemRule,
        value: string
      ): boolean {
        return (
          !!modelRef.value.password &&
          modelRef.value.password.startsWith(value) &&
          modelRef.value.password.length >= value.length
        )
      }
      function validatePasswordSame (rule: FormItemRule, value: string): boolean {
        return value === modelRef.value.password
      }
      const rules: FormRules = {
        age: [
          {
            required: true,
            validator (rule: FormItemRule, value: string) {
              if (!value) {
                return new Error('请填写邮箱')
              } else if (value.length<5||value.length > 28) {
                return new Error('邮箱格式有误')
              }
              return true
            },
            trigger: ['input', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ],
        reenteredPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
          },
          {
            validator: validatePasswordStartWith,
            message: '两次密码输入不一致',
            trigger: 'input'
          },
          {
            validator: validatePasswordSame,
            message: '两次密码输入不一致',
            trigger: ['blur', 'password-input']
          }
        ]
      }
      return {
        formRef,
        rPasswordFormItemRef,
        model: modelRef,
        rules,
        handlePasswordInput () {
          if (modelRef.value.reenteredPassword) {
            rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
          }
        },
        handleValidateButtonClick (e: MouseEvent) {
          e.preventDefault()
          formRef.value?.validate((errors) => {
            if (!errors) {
              message.success('验证成功')
            } else {
              console.log(errors)
              message.error('验证失败')
            }
          })
        }
      }
    }
  })
  </script>