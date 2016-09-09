/**
 * Created by yk on 2016/9/7.
 */
import Util from '../common/util'
import {GV_INIT_SUC,GV_PULL_REQ, GV_PULL_SUC, GV_FETCH_PULL_REQ, GV_FETCH_PULL_SUC, GV_FETCH_SCROLL_DOWN_REQ, GV_FETCH_SCROLL_DOWN_SUC, GV_SCROLL_DOWN_REQ, GV_SCROLL_DOWN_SUC} from '../common/ActionConstant'

export  default function goodVideo(state, action) {
    switch(action.type) {
        case GV_INIT_SUC:
            return {
                lastTime: new Date().getTime(),
                items:Util.handleArrayObject(action.res),
                lastFetchingScrollDownId: null,
                pullRefreshing:false
            }
        case GV_SCROLL_DOWN_REQ:
            return {
                ...state,
                lastFetchingScrollDownId: action.lastId,
            }
        case GV_SCROLL_DOWN_SUC:
            const newMatch = Util.handleArrayObject(action.res)
            const newVL = Util.mergeTwoArrayObject(state.items, newMatch)
            return {
                ...state,
                lastTime: new Date().getTime(),
                items:newVL
            }
        case GV_PULL_REQ:
            return {
                ...state,
                pullRefreshing:true,
            }
        case GV_PULL_SUC:
            const newVideo = Util.handleArrayObject(action.res)
            const newVL = Util.mergeTwoArrayObject(newVideo, state.items)
            return {
                ...state,
                lastTime: new Date().getTime(),
                items:newVL,
                pullRefreshing:false,
            }
        default:
            return state
    }
}


