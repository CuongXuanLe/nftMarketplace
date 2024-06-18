import { manageService } from "./manageService"
import { registerSuccess } from "../Redux/authSlice"

export const registerAction =  (formData) => {
    return async(dispatch) => {
        try {
            const res = await manageService.register(formData)
            console.log('res: ', res.data, '-', res.status)
            if(res.status === 201) {
                dispatch({ type: 'auth/registerSuccess', formRegis: res.data.data.user });
            }
        } catch (err) {
            console.log('err: ', err)
        }
    }
}