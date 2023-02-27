import { SHOW_NEWS, SELECT_NEWS, SHOW_VACCINE, SELECT_VACCINE, SHOW_HOSPITAL, SELECT_HOSPITAL, SHOW_CASE, SELECT_CASE, SHOW_ABOUT, SELECT_ABOUT } from "../constants/actionType"
export const act_news_detail = (news) => {
    return {
        type: SHOW_NEWS,
        payload: news
    }
}

export const act_select_news = (id) => {
    return {
        type: SELECT_NEWS,
        payload: id
    }
}

export const act_vaccine_detail = (vaccine) => {
    return {
        type: SHOW_VACCINE,
        payload: vaccine
    }
}

export const act_select_vaccine = (id) => {
    return {
        type: SELECT_VACCINE,
        payload: id
    }
}

export const act_hospital_detail = (vaccine) => {
    return {
        type: SHOW_HOSPITAL,
        payload: vaccine
    }
}

export const act_select_hospital = (id) => {
    return {
        type: SELECT_HOSPITAL,
        payload: id
    }
}


export const act_case_detail = (data) => {
    return {
        type: SHOW_CASE,
        payload: data
    }
}

export const act_select_case = (id) => {
    return {
        type: SELECT_CASE,
        payload: id
    }
}

export const act_about_detail = (data) => {
    return {
        type: SHOW_ABOUT,
        payload: data
    }
}

export const act_select_about = (id) => {
    return {
        type: SELECT_ABOUT,
        payload: id
    }
}