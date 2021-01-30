const LOGIN_CHECK = "LOGIN_CHECK";
const RETRY = "RETRY";
const MOVE_LOGIN = 'MOVE_LOGIN'
const SET_VALIDATION = 'SET_VALIDATION'
export const LOGIN = "pinchuk.fl@yandex.ru";
export const PASSWORD = "12345678";

const initialState = {
  wrongData: false,
  correctData: false,
  isMoveLogin: false,
  email: false,
  password: false,
  recoverEmail: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHECK: {
      if (
        action.payload[0] === LOGIN &&
        action.payload[1] === PASSWORD
      ) {
        return {
          ...state,
          correctData: true,
        };
      } else {
        return {
          ...state,
          wrongData: true,
        };
      }
    }
    case RETRY: {
      return {
        ...state,
        wrongData: false,
        correctData: false,
      };
    }
    case SET_VALIDATION: {
      return {
        ...state,
        [action.value]: !state[action.value]
      }
    }
    case MOVE_LOGIN: {
      return {
        ...state,
        isMoveLogin: !state.isMoveLogin
      }
    }
    default:
      return state;
  }
}

export const setValidationCreator = (value) => ({
  type: SET_VALIDATION,
  value
})

export const loginCheckCreator = (payload) => ({
  type: LOGIN_CHECK,
  payload,
});

export const retryCreator = () => ({
  type: RETRY,
});

export const moveLoginCreator = () => ({
  type: MOVE_LOGIN
})

export default reducer;
