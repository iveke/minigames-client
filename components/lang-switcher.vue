<script setup>

const switchLocalePath = useSwitchLocalePath()

function changeLocale(event) {
  const locale = event.target.value
  const path = switchLocalePath(locale)
  if (path) {
    navigateTo(path)
  }
}
const currentLocale = useState('currentLocale', () => {
  return useCookie('i18n_redirected')
})

</script>

<template>
  <select @input="changeLocale" name="locale" id="locale">
    <option value="uk" :selected="currentLocale === 'uk'">UA</option>
    <option value="en" :selected="currentLocale === 'en'">EN</option>
  </select>
</template>


<style scoped>

</style>