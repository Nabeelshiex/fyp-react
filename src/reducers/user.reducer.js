import * as Actions from '../actions';

const initialState = {
    user: {
        name: '',
        image: '',
        description: '',
        location: '',
        rating: 0,
        sameUserVisitProfile: true
    },
    imageForNavBar: '',
    userName: '',
    token: '',
    isLoggedIn: false,
    isRegistered: false,
    redirectToLogin: false,
    redirectToRegister: false,
    viewMode: 'light',
    editLocation: false,
    editDescription: false,
    uploadingImage: false,
    isUpdatePasswordModal: false,
    isPasswordUpdated: false,
    linearProgress: false,
    isNavBarMenu: false
}

function userReducer(state = initialState, action) {
    const data = action.payload;
    switch (action.type) {
        case Actions.GET_USERS_LIST:
            return state = {
                ...state,
                users: data,
                linearProgress: false
            }
        case Actions.LOGGED_IN:
            return state = {
                ...state,
                isLoggedIn: localStorage.getItem('isLoggedIn'),
                token: localStorage.getItem('token'),
                linearProgress: false
            }
        case Actions.USER_REGISTERED:
            return state = {
                ...state,
                isRegistered: true,
                linearProgress: false
            }
        case Actions.GET_USER:
            return state = {
                ...state,
                user: {
                    name: data.name,
                    image: 'http://127.0.0.1:8000' + data.image,
                    description: data.description,
                    location: data.location,
                    rating: data.rating,
                    sameUserVisitProfile: data.sameUserVisitProfile
                },
                linearProgress: false
            }
        case Actions.LOGGED_OUT:
            return state = {
                ...state,
                isLoggedIn: false,
                userName: '',
                token: '',
                linearProgress: false
            }
        case Actions.REDIRECT_LOGIN:
            return state = {
                ...state,
                redirectToRegister: false,
                redirectToLogin: true,
                linearProgress: false
            }
        case Actions.REDIRECT_REGISTER:
            return state = {
                ...state,
                redirectToLogin: false,
                redirectToRegister: true,
                linearProgress: false
            }
        case Actions.DARK_MODE:
            return state = {
                ...state,
                viewMode: 'dark'
            }
        case Actions.LIGHT_MODE:
            return state = {
                ...state,
                viewMode: 'light'
            }
        case Actions.IMAGE_UPLOADED:
            return state = {
                ...state,
                user: {
                    ...state.user,
                    image: 'http://127.0.0.1:8000' + data
                },
                linearProgress: false
            }
        case Actions.LOCATION_UPDATED:
            return state = {
                ...state,
                user: {
                    ...state.user,
                    location: data,
                },
                linearProgress: false
            }
        case Actions.EDIT_LOCATION:
            if (state.editLocation) {
                return state = {
                    ...state,
                    editLocation: false,
                    linearProgress: false
                }
            }
            return state = {
                ...state,
                editLocation: true,
                linearProgress: false
            }
        case Actions.EDIT_DESCRIPTION:
            if (state.editDescription) {
                return state = {
                    ...state,
                    editDescription: false,
                    linearProgress: false
                }
            }
            return state = {
                ...state,
                editDescription: true,
                linearProgress: false
            }
        case Actions.DESCRIPTION_UPDATED:
            return state = {
                ...state,
                user: {
                    ...state.user,
                    description: data,
                },
                linearProgress: false
            }
        case Actions.IMAGE_UPLOAD_BUTTON:
            if (state.uploadingImage) {
                return state = {
                    ...state,
                    uploadingImage: false,
                    linearProgress: false
                }
            }
            return state = {
                ...state,
                uploadingImage: true,
                linearProgress: false
            }
        case Actions.TOGGLE_UPDATE_PASSWORD_MODAL:
            if (state.isUpdatePasswordModal) {
                return state = {
                    ...state,
                    isUpdatePasswordModal: false,
                    linearProgress: false
                }
            }
            return state = {
                ...state,
                isUpdatePasswordModal: true,
                linearProgress: false
            }
        case Actions.PASSWORD_UPDATED:
            return state = {
                ...state,
                isPasswordUpdated: true,
                linearProgress: false
            }
        case Actions.PASSWORD_UPDATED_HIDE_SNAKE_BAR:
            return state = {
                ...state,
                isPasswordUpdated: false,
                linearProgress: false
            }
        case Actions.GET_IMAGE_FOR_NAVBAR:
            return state = {
                ...state,
                imageForNavBar: 'http://127.0.0.1:8000' + data
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
        case Actions.TOGGLE_NAVBAR_MENU:
            if (state.isNavBarMenu) {
                return state = {
                    ...state,
                    isNavBarMenu: data
                }
            }
            return state = {
                ...state,
                isNavBarMenu: data
            }
        default:
            return state = {
                ...state,
                userName: localStorage.getItem('userName'),
                token: localStorage.getItem('token'),
                isLoggedIn: localStorage.getItem('isLoggedIn'),
            };
    }
}

export default userReducer;