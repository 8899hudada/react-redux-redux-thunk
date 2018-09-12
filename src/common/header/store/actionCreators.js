import  * as actionTypes  from './actionTypes'
import axios from 'axios'
import { fromJS } from 'immutable'

export const searchFocus = () => ({
    type: actionTypes.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: actionTypes.SEARCH_BLUR
})

const changeList = (data) => ({
    type: actionTypes.CHANGE_LIST,
    data: fromJS(data) ,    //  数据类型 保持一致   都为immutable数组
    totalPage: Math.ceil(data.length / 10)
})

export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            if (res.data.success) {
                dispatch(changeList(res.data.data))
            }
        }).catch( (e) => {
            console.log(e)
        })
    }
}

export const mouseEnter = () => ({
    type: actionTypes.MOUSE_ENTER
})

export const mouseLeave = () => ({
    type: actionTypes.MOUSE_LEAVE
})

export const changePage = (nextPage) => ({
    type: actionTypes.CHANGE_PAGE,
    nextPage
})
