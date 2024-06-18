import { manageService } from "./manageService"
import { registerSuccess, loginSuccess } from "../Redux/authSlice"

const registerAction =  (formData) => {
    return async(dispatch) => {
        try {
            const res = await manageService.register(formData)
            if(res.status === 201) {
                dispatch({ type: 'auth/registerSuccess', formRegis: res.data.data.user });
            }
        } catch (err) {
            console.log('err: ', err)
        }
    }
}

const loginAction =  (formData) => {
    return async(dispatch) => {
        try {
            const res = await manageService.login(formData)
            if(res.status === 200) {
                dispatch({ type: 'auth/loginSuccess', dataUser: res.data });
            }
        } catch (err) {
            console.log('err: ', err)
        }
    }
}


export {
    registerAction,
    loginAction,
}