import axios from "axios";

export const GET_USERS_LIST = "GET_USERS_LIST";
export const LOGGED_IN = "LOGGED_IN";
export const USER_REGISTERED = "USER_REGISTERED";
export const GET_USER = "GET_USER";
export const LOGGED_OUT = "LOGGED_OUT";
export const REDIRECT_LOGIN = "REDIRECT_LOGIN";
export const REDIRECT_REGISTER = "REDIRECT_REGISTER";
export const DARK_MODE = "DARK_MODE";
export const LIGHT_MODE = "LIGHT_MODE";
export const IMAGE_UPLOADED = "IMAGE_UPLOADED";
export const EDIT_LOCATION = "EDIT_LOCATION";
export const LOCATION_UPDATED = "LOCATION_UPDATED";
export const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
export const DESCRIPTION_UPDATED = "DESCRIPTION_UPDATED";
export const IMAGE_UPLOAD_BUTTON = "IMAGE_UPLOAD_BUTTON";
export const GET_RECENT_POSTS = "GET_RECENT_POSTS";
export const GET_ALL_USER_POSTS = "GET_ALL_USER_POSTS";
export const TOGGLE_POSTS = "TOGGLE_POSTS";
export const GET_SINGLE_POST = "GET_SINGLE_POST";
export const ADD_POST = "ADD_POST";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_USER_FOR_POST = "GET_USER_FOR_POST";
export const GET_USERS_FOR_MESSAGE = "GET_USERS_FOR_MESSAGE";
export const GET_MESSAGES_BY_USER = "GET_MESSAGES_BY_USER";
export const GET_LOGGED_IN_USER_ID_FOR_MESSAGES =
  "GET_LOGGED_IN_USER_ID_FOR_MESSAGES";
export const SET_SECOND_USER_NAME = "SET_SECOND_USER_NAME";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const GET_UNREAD_MESSAGE_COUNT = "GET_UNREAD_MESSAGE_COUNT";
export const GET_READ_MESSAGE_COUNT = "GET_READ_MESSAGE_COUNT";
export const TOGGLE_UPDATE_PASSWORD_MODAL = "TOGGLE_UPDATE_PASSWORD_MODAL";
export const PASSWORD_UPDATED = "PASSWORD_UPDATED";
export const PASSWORD_UPDATED_HIDE_SNAKE_BAR =
  "PASSWORD_UPDATED_HIDE_SNAKE_BAR";
export const GET_COUNT_OF_ALL_POST = "GET_COUNT_OF_ALL_POST";
export const TOGGLE_LINEAR_PROGRESS = "TOGGLE_LINEAR_PROGRESS";
export const ADD_BID = "ADD_BID";
export const GET_IMAGE_FOR_NAVBAR = "GET_IMAGE_FOR_NAVBAR";
export const BID_ACCEPTED = "BID_ACCEPTED";
export const BID_ALERT_DIALOG = "BID_ALERT_DIALOG";
export const SET_BID_FOR_ALERT_DIALOG = "SET_BID_FOR_ALERT_DIALOG";
export const GET_BRAIN_TREE_CLIENT_TOKEN = "GET_BRAIN_TREE_CLIENT_TOKEN";
export const SET_BRAINTREE_INSTANCE = "SET_BRAINTREE_INSTANCE";
export const BRAINTREE_CHECKOUT = "BRAINTREE_CHECKOUT";
export const TOGGLE_PAYMENT_METHOD_MODAL = "TOGGLE_PAYMENT_METHOD_MODAL";
export const TOGGLE_NAVBAR_MENU = "TOGGLE_NAVBAR_MENU";
export const GET_LINE_CHART_EARNING = "GET_LINE_CHART_EARNING";
export const GET_PIE_CHART_EARNING = "GET_PIE_CHART_EARNING";
export const GET_BAR_CHART_EARNING = "GET_BAR_CHART_EARNING";
export const NUMERIC_EARNING = "NUMERIC_EARNING";
export const TOGGLE_ADD_NEW_POST_CARD = "TOGGLE_ADD_NEW_POST_CARD";
export const IS_REVIEW_SUBMITTED = "IS_REVIEW_SUBMITTED";

export function toggleLinearProgress() {
  return {
    type: TOGGLE_LINEAR_PROGRESS,
  };
}

export function login(userData) {
  const request = axios.post("http://127.0.0.1:8000/api/auth/login", userData);

  return (dispatch) => {
    request
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", true);
        dispatch({
          type: LOGGED_IN,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
}

export function addUser(user) {
  const request = axios.post("http://127.0.0.1:8000/api/users", user);

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: USER_REGISTERED,
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
}

export function getLoggedInUser() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/user/get-user?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    });
  };
}

export function logout() {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/logout?token=${token}`,
  );

  return (dispatch) => {
    request
      .then((res) => {
        localStorage.clear();
        dispatch({
          type: LOGGED_OUT,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
}

export function uploadImage(image) {
  const formData = new FormData();

  formData.append("image", image);

  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/user/upload-image?token=${token}`,
    formData,
  );

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: IMAGE_UPLOADED,
          payload: res.data,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function uploadLocation(location) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/user/upload-location?token=${token}`,
    location,
  );

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: LOCATION_UPDATED,
          payload: res.data,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function uploadDescription(description) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/user/upload-description?token=${token}`,
    description,
  );

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: DESCRIPTION_UPDATED,
          payload: res.data,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function updatePassword(data) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/user/update-password?token=${token}`,
    data,
  );
  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: PASSWORD_UPDATED,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function getImageForNavBar() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/user/get-image?token=${token}`,
  );
  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_IMAGE_FOR_NAVBAR,
        payload: res.data,
      });
    });
  };
}

export function isPasswordUpdatedHideSnakeBar() {
  return {
    type: PASSWORD_UPDATED_HIDE_SNAKE_BAR,
  };
}

export function redirectToLogin() {
  return {
    type: REDIRECT_LOGIN,
  };
}

export function redirectToRegister() {
  return {
    type: REDIRECT_REGISTER,
  };
}

export function darkMode() {
  return {
    type: DARK_MODE,
  };
}

export function lightMode() {
  return {
    type: LIGHT_MODE,
  };
}

export function toggleUpdatePasswordModal() {
  return {
    type: TOGGLE_UPDATE_PASSWORD_MODAL,
  };
}

export function toggleEditLocation() {
  return {
    type: EDIT_LOCATION,
  };
}

export function toggleEditDescription() {
  return {
    type: EDIT_DESCRIPTION,
  };
}

export function toggleImageUploadBtn() {
  return {
    type: IMAGE_UPLOAD_BUTTON,
  };
}

export function toggleAddNewPostCard() {
  return {
    type: TOGGLE_ADD_NEW_POST_CARD,
  };
}

export function getRecentPosts() {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/recent?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_RECENT_POSTS,
        payload: res.data,
      });
    });
  };
}

export function getAllUserPosts() {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/user-all?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_ALL_USER_POSTS,
        payload: res.data,
      });
    });
  };
}

export function getSinglePost(postId) {
  let token = localStorage.getItem("token");
  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/single?token=${token}`,
    { postId },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data,
      });
    });
  };
}

export function addPost(image, title, description) {
  const formData = new FormData();

  formData.append("image", image);

  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/add?token=${token}&title=${title}&description=${description}`,
    formData,
  );

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: ADD_POST,
          payload: res.data,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function allPosts() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/post?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data,
      });
    });
  };
}

export function getUserForPosts(userId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/get-username?token=${token}`,
    { userId },
  );

  return (dispatch) => {
    request
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_USER_FOR_POST,
          payload: res.data,
        });
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };
}

export function getLoggedInUserWithUserId(userId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/get-user?token=${token}`,
    { userId },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    });
  };
}

export function getRecentPosts2(userId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/recent?token=${token}`,
    { userId },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_RECENT_POSTS,
        payload: res.data,
      });
    });
  };
}

export function getAllUserPosts2(userId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/post/user-all?token=${token}`,
    { userId },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_ALL_USER_POSTS,
        payload: res.data,
      });
    });
  };
}

export function getCountOfAllPosts() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/post/count?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_COUNT_OF_ALL_POST,
        payload: res.data,
      });
    });
  };
}

export function togglePosts() {
  return {
    type: TOGGLE_POSTS,
  };
}

export function getUsersListForMessages() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/message/get-users?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_USERS_FOR_MESSAGE,
        payload: res.data,
      });
    });
  };
}

export function getMessagesByUser(userId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/message/get-messages?token=${token}`,
    { userId },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_MESSAGES_BY_USER,
        payload: res.data,
      });
    });
  };
}

export function getLoggedInUserId() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/message/get-logged-in-user-id?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_LOGGED_IN_USER_ID_FOR_MESSAGES,
        payload: res.data,
      });
    });
  };
}

export function setsecondUserIdNameForMessages(id, name) {
  return {
    type: SET_SECOND_USER_NAME,
    payload: { id, name },
  };
}

export function addMessage(userId, message) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/message/add?token=${token}`,
    { userId, message },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: ADD_MESSAGE,
        payload: res.data,
      });
    });
  };
}

export function getUnReadMessageCount() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/message/unread-count?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_UNREAD_MESSAGE_COUNT,
        payload: res.data,
      });
    });
  };
}

export function getReadMessageCount(userId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/message/read-count?token=${token}`,
    { userId },
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_READ_MESSAGE_COUNT,
        payload: res.data,
      });
    });
  };
}

export function addBid(formData) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/bid/add?token=${token}`,
    formData,
  );

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: ADD_BID,
          payload: res.data,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function bidAccepted(bidId) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/bid/accepted?token=${token}`,
    { bidId },
  );

  return (dispatch) => {
    request
      .then((res) => {
        dispatch({
          type: BID_ACCEPTED,
          payload: res.data,
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
}

export function toggleBidAlertDialog() {
  return {
    type: BID_ALERT_DIALOG,
  };
}

export function setBidForAlertDialog(bid) {
  return {
    type: SET_BID_FOR_ALERT_DIALOG,
    payload: bid,
  };
}

export function getBrainTreeClientToken() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/payment?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_BRAIN_TREE_CLIENT_TOKEN,
        payload: res.data,
      });
    });
  };
}

export function setBrainTreeInstance(instance) {
  return {
    type: SET_BRAINTREE_INSTANCE,
    payload: instance,
  };
}

export function brainTreeCheckout(data) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/payment/checkout?token=${token}`,
    data,
  );

  return (dispatch) => {
    request.then((res) => {
      if (res.data.success) {
        alert("Successfully Paid");
      }
      dispatch({
        type: BRAINTREE_CHECKOUT,
      });
    });
  };
}

export function togglePaymentMethodModal() {
  return {
    type: TOGGLE_PAYMENT_METHOD_MODAL,
  };
}

export function toggleNavBarMenu(data) {
  return {
    type: TOGGLE_NAVBAR_MENU,
    payload: data,
  };
}

export function getLineChartEarning() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/earning/total?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_LINE_CHART_EARNING,
        payload: res.data,
      });
    });
  };
}

export function getPieChartEarning() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/earning/pending?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_PIE_CHART_EARNING,
        payload: res.data,
      });
    });
  };
}

export function getBarChartEarning() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/earning/withdraw?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: GET_BAR_CHART_EARNING,
        payload: res.data,
      });
    });
  };
}

export function getNumericEarning() {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/earning?token=${token}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: NUMERIC_EARNING,
        payload: res.data,
      });
    });
  };
}

export function createReview(data) {
  let token = localStorage.getItem("token");

  const request = axios.post(
    `http://127.0.0.1:8000/api/auth/review?token=${token}`,
    data,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: IS_REVIEW_SUBMITTED,
        payload: true,
      });
    });
  };
}

export function checkReview(postId) {
  let token = localStorage.getItem("token");

  const request = axios.get(
    `http://127.0.0.1:8000/api/auth/review/check-review?token=${token}&postId=${postId}`,
  );

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: IS_REVIEW_SUBMITTED,
        payload: res.data,
      });
    });
  };
}
