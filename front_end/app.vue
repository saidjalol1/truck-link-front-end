<script setup>
const router = useRouter()

const btnLoader = ref(false)
const delay_load =  () =>{
    setTimeout(() => {
        btnLoader.value = false
    }, 2000);
}

onMounted(() => {
  delay_load()
  const route = useRoute()
  const token = route.query.token
  const error = route.query.error
  
  if (token) {
    localStorage.setItem("truckLink", token)
    router.push("/")
  } else if (error) {
    alert(`${error}`)
    router.push("/auth")
  }
})
</script>
<template>
  <div v-if="btnLoader" class="overlay">
        <div v-if="btnLoader" class="loader"></div>
  </div>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
