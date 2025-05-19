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
<h1>dashboard</h1>
</template>
<style scoped></style>