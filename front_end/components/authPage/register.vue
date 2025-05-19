<script setup>

const login = () =>{}
const handleGoogleLogin = () =>{}


const emit = defineEmits(["loginOpen"])

const loginOpen = () => {
  emit("loginOpen")
}
</script>
<template>
    <form @submit.prevent="login">
        <div class="form-group flex flex-col">
            <label for="email" class="text-gray-600 text-sm font-bold mb-1 pl-2">Email*</label>
            <input type="email" name="email" placeholder="Email kiriting" class="py-4 px-2 font-bold text-sm border-2 border-gray-200 rounded-lg outline-blue-600 hover:shadow shadow-blue-100">
        </div>
        <div class="form-group flex flex-col mt-6">
            <label for="password" class="text-gray-600 text-sm  font-bold mb-1 pl-2">Parol o'rnating*</label>
            <input type="password" name="password" placeholder="Parol o'rnating" class="py-4 px-2 font-bold text-sm border-2 border-gray-200 rounded-lg outline-blue-600 hover:shadow shadow-blue-100">
        </div>
        <div class="form-group flex flex-col mt-6">
            <input type="submit" name="login" value="Tasdiqlash" class="py-3 cursor-pointer bg-blue-700 border-none text-white font-bold hover:bg-blue-800 rounded-lg">
        </div>
        <div class="form-group flex flex-col mt-4">
            <button @click="handleGoogleLogin" class="google-btn flex gap-2 justify-center items-center py-3 cursor-pointer border-1 border-gray-200 text-gray-700 font-bold hover:shadow rounded-lg">
                <img width="25px" height="20px" src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="icon" />
                Google orqali ro'yxatdan o'tish
            </button>
        </div>
    </form>

    <div class="border-1 border-gray-200 mt-20"></div>

    <p class="text-center mt-2 text-gray-400 ">Hisobingiz bormi?  <span @click="loginOpen" class="font-bold text-blue-600 cursor-pointer">Kirish</span></p>
</template>
<style scoped>
</style>