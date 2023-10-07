export default defineNuxtPlugin((nuxtApp) => {
  watchEffect(() => {
    document.querySelector('html')?.setAttribute('dir', nuxtApp.$i18n.locale.value === 'en' ? 'ltr' : 'rtl')
    document.querySelector('html')?.setAttribute('lang', nuxtApp.$i18n.locale.value)
  })
})
