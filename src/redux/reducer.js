const LOGIN_CHECK = "LOGIN_CHECK";
const RETRY = "RETRY";
const MOVE_LOGIN = 'MOVE_LOGIN'
const REG_EXP1 = /^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
const REG_EXP2 = /^[0-9a-z_-]+\.[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
export const LOGIN = "pinchuk.fl@yandex.ru";
export const PASSWORD = "12345678";

const initialState = {
  invalidEmail: false,
  invalidPassword: false,
  wrongData: false,
  correctData: false,
  isMoveLogin: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHECK: {
      if (!REG_EXP1.test(action.payload[0])&&!REG_EXP2.test(action.payload[0])) {
        return {
          ...state,
          invalidEmail: true,
        };
      } else if (action.payload[1].length < 8) {
        return {
          ...state,
          invalidPassword: true,
        };
      } else if (
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
        invalidEmail: false,
        invalidPassword: false,
        wrongData: false,
        correctData: false,
      };
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
