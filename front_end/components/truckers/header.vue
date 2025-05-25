<script setup>
const profile = ref(false)

const profileBlock = () =>{
    profile.value = !profile.value
}

function getLimitedFullName(name, surname, maxLength = 10) {
  const fullName = `${name ?? ''} ${surname ?? ''}`.trim();
  return fullName.length > maxLength
    ? fullName.slice(0, maxLength).trim() + '…'
    : fullName;
}
</script>
<template>
    <div class="flex">
        <div class="hidden md:block lg:block">
            <TruckersSidebarMenu />
        </div>
        <div class="header py-4 px-5 flex items-center flex-1 justify-between shadow gap-4">
            <div class="menu_btn bg-gray-100 flex items-center">
                <input type="text" class="outline-none px-2 font-bold" placeholder="Qidiruv">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
            <div @click="profileBlock" class="profile flex items-center gap-4">
                <div class="image cursor-pointer">
                    <NuxtImg src="images/ChatGPT Image May 25, 2025, 03_59_11 PM.png" />
                </div>
            </div>
        </div>
    </div>
    <div v-if="profile" class="profile-drop shadow rounded text-gray-300">
        <div class="block-1 flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer">
            <div class="text-gray-400 font-bold">
                saidjalolturakhujayev@gmail.com
            </div>
        </div>
        <hr>
        <div class="block-1 flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer">
            <div class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
            </div>
            <div class="text-black font-bold text-sm">
                Tahrirlash
            </div>
        </div>
        <div class="block-1 flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer">
            <div class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
            </div>
            <div class="text-black font-bold text-sm">
                Chiqish
            </div>
        </div>
        <div class="block-1 flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer">
            <div class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
            </div>
            <div class="text-black font-bold text-sm">
                Yordam
            </div>
        </div>
    </div>
</template>
<style scoped>
.header{
    height: 70px;
    background-color: white
}
.menu_btn{
    padding: 8px;
    cursor: pointer;
    border-radius: 10px;

}

.image{
    width: 38px;
    height: 38px;
    border-radius: 50%;
    overflow: hidden;
}
.image:hover{
    width: 36px;
    height: 36px;
}
img{
    width: 100%;
    height: 100%;
}
.profile-drop{
    position: absolute;
    top: 73px;
    right: 20px;
    background-color: white;
}
</style>