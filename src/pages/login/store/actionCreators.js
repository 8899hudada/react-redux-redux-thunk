import axios from 'axios'
import * as actionTypes from './actionTypes'

export const login = (accout, password) => (dispatch) => {
    axios.get('/api/login.json?accout=' + accout + '&password=' + password).then((res) => {
        const result = res.data.data
        const action = {
            type: actionTypes.CHANGE_LOGIN,
            value: true
        }
        result ? dispatch(action) : console.log('登陆失败')
    })
}

export const logout = () => ({
    type: actionTypes.LOGOUT,
    value: false
})  
