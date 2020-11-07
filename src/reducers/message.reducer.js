import * as Actions from '../actions';

const initialState = {
    users: [],
    messagesByUser: [],
    loggedInUserId: null,
    textFieldForMessages: true,
    secondUserName: '',
    secondUserId: null,
    unReadMessageCount: 0,
    linearProgress: false
}

function messageReducer(state = initialState, action) {
    const data = action.payload;
    switch (action.type) {
        case Actions.GET_USERS_FOR_MESSAGE:
            return state = {
                ...state,
                users: data,
                linearProgress: false
            }
        case Actions.GET_MESSAGES_BY_USER:
            return state = {
                ...state,
                messagesByUser: data,
                textFieldForMessages: false,
                linearProgress: false
            }
        case Actions.GET_LOGGED_IN_USER_ID_FOR_MESSAGES:
            return state = {
                ...state,
                loggedInUserId: data,
                linearProgress: false
            }
        case Actions.SET_SECOND_USER_NAME:
            return state = {
                ...state,
                secondUserId: data.id,
                secondUserName: data.name,
                linearProgress: false
            }
        case Actions.ADD_MESSAGE:
            let newMessagesArray = [...state.messagesByUser, data];
            return state = {
                ...state,
                messagesByUser: newMessagesArray,
                linearProgress: false
            }
        case Actions.GET_UNREAD_MESSAGE_COUNT:
            return state = {
                ...state,
                unReadMessageCount: data,
                linearProgress: false
            }
        case Actions.GET_READ_MESSAGE_COUNT:
            return state = {
                ...state,
                unReadMessageCount: state.unReadMessageCount - data,
                linearProgress: false
            }
        case Actions.TOGGLE_LINEAR_PROGRESS:
            if (state.linearProgress) {
                return state = {
                    ...state,
                    linearProgress: false
                }
            }
            return state = {
                ...state,
                linearProgress: true
            }
        default:
            return state;
    }
}

export default messageReducer;