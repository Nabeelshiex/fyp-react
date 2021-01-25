import * as Actions from "../actions";

const initialState = {
  recentPosts: [],
  allUserPosts: [],
  togglePosts: true,
  singlePost: {},
  allPosts: [],
  allCurrentPostsCount: 0,
  userForPost: "",
  allPostsCountFromDB: 0,
  linearProgress: false,
  bidAlertDialogBox: false,
  bidForAlertDialog: {},
  isAddPost: false,
  loggedInUserId: 0,
  isReviewSubmitted: false,
};

function postReducer(state = initialState, action) {
  const data = action.payload;
  switch (action.type) {
    case Actions.GET_RECENT_POSTS:
      return (state = {
        ...state,
        recentPosts: data,
        linearProgress: false,
      });
    case Actions.GET_ALL_USER_POSTS:
      return (state = {
        ...state,
        allUserPosts: data,
        linearProgress: false,
      });
    case Actions.TOGGLE_POSTS:
      if (state.togglePosts)
        return (state = {
          ...state,
          togglePosts: false,
          linearProgress: false,
        });
      return (state = {
        ...state,
        togglePosts: true,
        linearProgress: false,
      });
    case Actions.GET_SINGLE_POST:
      return (state = {
        ...state,
        singlePost: data,
        linearProgress: false,
      });
    case Actions.ADD_POST:
      let newPostsArray = [data, ...state.allPosts];
      return (state = {
        ...state,
        allPosts: newPostsArray,
        allCurrentPostsCount: newPostsArray.length,
        linearProgress: false,
      });
    case Actions.GET_ALL_POSTS:
      return (state = {
        ...state,
        allPosts: data,
        allCurrentPostsCount: data.length,
        linearProgress: false,
      });
    case Actions.GET_USER_FOR_POST:
      return (state = {
        ...state,
        userForPost: data.name,
        linearProgress: false,
      });
    case Actions.GET_COUNT_OF_ALL_POST:
      return (state = {
        ...state,
        allPostsCountFromDB: data,
        linearProgress: false,
      });
    case Actions.ADD_BID:
      let newArray = [];
      state.allPosts.forEach((post) => {
        if (post.id === data.id) {
          post = data;
        }
        newArray.push(post);
      });
      return (state = {
        ...state,
        allPosts: newArray,
      });
    case Actions.BID_ACCEPTED:
      let newPostArrayAfterBidAccept = [];
      state.allPosts.forEach((post) => {
        if (post.id === data.id) {
          post = data;
        }
        newPostArrayAfterBidAccept.push(post);
      });
      return (state = {
        ...state,
        allPosts: newPostArrayAfterBidAccept,
      });
    case Actions.BID_ALERT_DIALOG:
      if (state.bidAlertDialogBox) {
        return (state = {
          ...state,
          bidAlertDialogBox: false,
        });
      }
      return (state = {
        ...state,
        bidAlertDialogBox: true,
      });
    case Actions.SET_BID_FOR_ALERT_DIALOG:
      return (state = {
        ...state,
        bidForAlertDialog: data,
      });
    case Actions.TOGGLE_LINEAR_PROGRESS:
      if (state.linearProgress) {
        return (state = {
          ...state,
          linearProgress: false,
        });
      }
      return (state = {
        ...state,
        linearProgress: true,
      });
    case Actions.BRAINTREE_CHECKOUT:
      return (state = {
        ...state,
        singlePost: {
          ...state.singlePost,
          isPaid: true,
        },
      });
    case Actions.TOGGLE_ADD_NEW_POST_CARD:
      if (state.isAddPost) {
        return (state = {
          ...state,
          isAddPost: false,
        });
      }
      return (state = {
        ...state,
        isAddPost: true,
      });
    case Actions.IS_REVIEW_SUBMITTED:
      return (state = {
        ...state,
        isReviewSubmitted: data,
      });
    default:
      return (state = {
        ...state,
      });
  }
}

export default postReducer;
