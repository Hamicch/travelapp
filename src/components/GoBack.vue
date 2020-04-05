<template>
        <span class="go-back">
             <button @click="goBack">Back</button>   
        </span>
</template>

<script>
export default {
        methods: {
                goBack() {
                        return this.$router.go(-1)
                }
        }
}
</script>

<style scoped>
.go-back {
        display: flex;
        cursor: pointer;
}

button {
        border: 0;
        background-color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
}

button:hover {
        color: rgb(73, 73, 73);
}
</style>