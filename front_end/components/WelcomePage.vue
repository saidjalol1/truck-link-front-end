<script setup>

const loginFormStatus = ref(true)
const registerFormStatus = ref(false)

const fullText = 'Hush Kelibsiz 👋'
const displayText = ref('')

const registerOpen = () =>{
    loginFormStatus.value = false
    registerFormStatus.value = true
}

const loginOpen = () =>{
    registerFormStatus.value = false
    loginFormStatus.value = true
}

onMounted(() => {
  let i = 0
  const interval = setInterval(() => {
    displayText.value += fullText[i]
    i++
    if (i >= fullText.length) clearInterval(interval)
  }, 150)
})
</script>
<template>
    <div class="w-full h-[calc(100vh)]">
        <div class="forms">
            <div>
                <h1> {{ displayText }} </h1>
            </div>
             <div class="form-group flex justify-center mb-4">
                    <NuxtImg src="/images/ChatGPT Image May 17, 2025, 06_06_51 PM.png" alt="company logo: truck link"/>
                </div>
            <div v-if="loginFormStatus" class="login-form">
                <AuthPageLogin @registerOpen="registerOpen"/>
            </div>
            <div v-if="registerFormStatus" class="register-form">
                <AuthPageRegister @loginOpen="loginOpen" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.banner{
    background-color: linear-gradient(blue);
}
h1{
    font-size: 30px;
    font-weight: 700;
    font-style: italic;
    text-align: center;
    margin-bottom: 20px;
    transition: all ease-in-out 1s;
}
.forms{
    width: 580px;
    padding: 5%;
    margin: 0 auto;
}
img{
    width: 100px;
    height: 100px;
}
@media screen and (max-width: 598px) {
    .forms{
        width: 480px;
        margin: 0 auto;
    }
   
}

@media screen and (max-width: 498px) {
    .forms{
        width: 380px;
        margin: 0 auto;
    }
   
}
@media screen and (max-width: 498px) {
    .forms{
        width: 340px;
        margin: 0 auto;
    }
   
}
</style>