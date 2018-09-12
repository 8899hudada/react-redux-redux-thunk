import axios from 'axios'
import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then( (res) => {
            const result = res.data.data
            const action = {
                type: actionTypes.GET_HOME_LIST,
                topicList: result.topicList,
                articleList: result.articleList,
                recommendList: result.recommendList
            }
            dispatch(action)
        })
    }
}

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page).then( (res) => {
            const action = {
                type: actionTypes.ADD_ARTICLE_LIST,
                list: fromJS(res.data.data),
                nextPage: page + 1
            }
            dispatch(action)
        })
    }
}

export const toggleTopShow = (isScroll) => ({
    type: actionTypes.SHOW_SCROLL,
    showScroll: isScroll
})

