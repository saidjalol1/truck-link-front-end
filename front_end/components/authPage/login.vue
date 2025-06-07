<script setup>
const router = useRouter()
const config = useRuntimeConfig()
const error = ref(null)
const btnLoader = ref(false)
const handleGoogleLogin = () => {
  btnLoader.value = true;
  window.location.href = `${config.public.apiBase}/auth/google`;
};


const emit = defineEmits(["registerOpen"])
const registerBlock = () => {
  emit("registerOpen")
}


const delay_load =  () =>{
    setTimeout(() => {
        btnLoader.value = false
    }, 2000);
}

const loginData = ref({
    email: "",
    password: ""
})

const login = async () =>{
    btnLoader.value = true
  try {
    const response = await fetch(`${config.public.apiBase}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData.value),
    })

    
    if (response.status === 401) {
      error.value = "Foydalanuvchi nomi yoki parol noto'g'ri";
      console.log(error.value);
      delay_load();
      return;
    }

    if (!response.status || !response.ok) {
      throw new Error('Network response was not ok')
    }

    const res = await response.json()
   
    
    delay_load()
    localStorage.setItem("truckLink", res["access_token"])
    router.push(`${res["user"]["role"]}`)

  } catch (error) {
    error.value = error
    console.log(JSON.stringify(loginData.value))
    console.log(error.value);
    delay_load()
  }
}

</script>
<template>
    <div  class="error text-center text-2xl mb-4">
        
    </div>
    <form @submit.prevent="login">
        <div class="form-group flex flex-col">
            <label for="email" class="text-gray-600 text-sm font-bold mb-1 pl-2 flex justify-between"><span>Email*</span> <span class="text-red-500 font-bold ">{{ error }}</span></label>
            <input v-model="loginData.email" type="email" name="email" placeholder="Email kiriting" class="py-4 px-2 font-bold text-sm border-2 border-gray-200 rounded-lg outline-blue-600 hover:shadow shadow-blue-100">
        </div>
        <div class="form-group flex flex-col mt-6">
            <label for="password" class="text-gray-600 text-sm  font-bold mb-1 pl-2">Parol*</label>
            <input v-model="loginData.password" type="password" name="password" placeholder="Parolingizni kiriting" class="py-4 px-2 font-bold text-sm border-2 border-gray-200 rounded-lg outline-blue-600 hover:shadow shadow-blue-100">
        </div>
        <div class="form-group flex flex-col mt-6">
            <input type="submit" name="login" value="Kirish" class="py-3 cursor-pointer bg-blue-700 border-none text-white font-bold hover:bg-blue-800 rounded-lg">
        </div>
        <div class="form-group flex flex-col mt-4">
            <button type="button" @click="handleGoogleLogin" class="google-btn flex gap-2 justify-center items-center py-3 cursor-pointer border-1 border-gray-200 text-gray-700 font-bold hover:shadow rounded-lg">
                <img width="25px" height="20px" src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="icon" />
                Google orqali kirish
            </button>
        </div>
    </form>
    <div v-if="btnLoader" class="overlay">
         <div v-if="btnLoader" class="loader"></div>
    </div>
    <div class="border-1 border-gray-200 mt-20"></div>

    <p class="text-center mt-2 text-gray-400 ">Hisobingiz yo'qmi?  <span @click="registerBlock" class="font-bold text-blue-600 cursor-pointer">Ro'yxatdan o'tish</span></p>
</template>
<style scoped>
.overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #30ccf3; /* Primary Blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
/* Loader Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>