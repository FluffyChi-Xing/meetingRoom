import axios from "axios";
//刷新accessToken
export const refresh = () => {
    const refreshToken = localStorage.getItem('refresh').toString();
    axios.post('http://localhost:3000/user/refresh', {
        refreshToken: refreshToken,
        isAdmin: false,
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