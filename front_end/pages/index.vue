<script setup>
const router = useRouter()


onMounted(() =>{
    const token = localStorage.getItem("truckLink")
    if (!token){
        router.push("/auth")
    }
})
</script>
<template>
    hello
</template>
<style scoped>
</style>