import Vue from 'vue'
import App from './App.vue'
import '@/assets/styles/css/main.css'
import './filters'

import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);
Vue.config.productionTip = false

Vue.mixin({
    methods: {
        hello: function() {
            console.log('hello from mixin!')
        },
        paginate(array, page_size, page_number) {
            return array.slice((page_number - 1) * page_size, page_number * page_size);
        },
        getData: function(data, pageSize, pageNumber) {
            pageNumber = pageNumber ? pageNumber : 10
            const PostsDataTotal = data.length
            const listNumberData = Array.from(Array(PostsDataTotal).keys(), n => n + 1)
            const paginate = this.paginate(listNumberData, pageSize, pageNumber);
            return data.slice(paginate[0] - 1, paginate.pop());
        },
        getDataById(data, id) {
            return data.filter((obj) => obj.id == id);
        }
    }
});


const auth = {
    userlogin: false,
};

const router = new VueRouter({
    routes,
    mode: "history",
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (auth.login) {
            next();
        } else {
            alert("sorry, you have Login first");
            next("/dashboard");
        }
    } else {
        next();
    }
});





new Vue({
    router,
    render: h => h(App),
}).$mount('#app')