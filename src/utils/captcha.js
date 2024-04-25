import axios from "axios";
import {ElMessage} from "element-plus";

export const captcha = (email) => {
    axios.get('http://localhost:3000/user/captcha',{
        params: {
            address: email
        }
    }).then((res) => {
        ElMessage({
            type: "success",
            message: res.data.message
        })
    }).catch((e) => {
        ElMessage({
            type: "warning",
            message: '错误'
        })
        console.log(e)
    })
}
