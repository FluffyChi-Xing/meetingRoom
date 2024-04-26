import {ref} from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter.js";
const store = useCounterStore()
//刷新accessToken
const refresh = () => {
    const refreshToken = localStorage.getItem('refresh').toString();
    const isAdmin = ref();
    console.log(typeof isAdmin.value)
    isAdmin.value = store.currentPermission;
    axios.post('http://localhost:3000/user/refresh', {
        refreshToken: refreshToken,
        isAdmin: isAdmin.value,
    },{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then((res) => {
        localStorage.setItem('access',res.data.data.accessToken)
    }).catch((err) => {
        console.log(err)
    })
}
setInterval(() => {
    refresh()
},300000)