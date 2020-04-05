<template>
    <nav id="nav">
        <p class="logo">My Tour Guide Travel App</p>
        <ul class="nav_links">
            <li class="links">
                <router-link to="/">Home</router-link>
            </li>
            <li v-for="destination in destinations" :key="destination.name" class="links">
                <router-link
                    :to="{
                        name: 'DestinationDetails',
                        params: { slug: destination.slug }
                }"
                >{{ destination.name }}</router-link>
            </li>
            <li class="links">
                <router-link to="/user">Dashboard</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import store from "@/store.js";

export default {
    data() {
        return {
            destinations: store.destinations
        };
    }
};
</script>

<style scoped>
#nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #fff;
    border-bottom: 1px solid grey;
    z-index: 1;
}

#nav a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: bold;
}

#nav a.travel-app-active-link {
    color: rgb(219, 71, 219);
}

.nav_links li {
    display: inline-block;
    padding: 0px 20px;
}

.links:hover {
    text-decoration: underline;
}

.logo {
    font-size: 20px;
    color: purple;
    font-weight: bold;
}
</style>