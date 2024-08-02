import { patchApi, postApi } from "../apiHelper/index";

const registerAccount = (obj, setData) => {
  postApi("AccountItems/signup", obj, (data) => setData(data));
};

const verificationCode = (obj, setData) => {
  patchApi("AccountItems/verifyaccount", obj, (data) => setData(data));
};

const loginAccount = (obj, setData) => {
  patchApi("AccountItems/signin", obj, (data) => setData(data));
};

const forgotUsername = (email, setData) => {
  patchApi(`AccountItems/forgetusername?aEmail=${email}`, null, (data) =>
    setData(data)
  );
};

const forgotPassword = (data, setData) => {
  patchApi(`AccountItems/forgetpassword?aIdentifier=${data}`, null, (data) =>
    setData(data)
  );
};

const verificationResetCode = (code, setData) => {
  patchApi(
    `AccountItems/verifypasswordresetcode?aResetCode=${code}`,
    null,
    (data) => setData(data)
  );
};

const resetPassword = (userId, resetCode, newPassword, setData) => {
  patchApi(
    `AccountItems/resetpassword?aId=${userId}&aResetCode=${resetCode}&aNewPassword=${newPassword}`,
    null,
    (data) => setData(data)
  );
};

export const LoginRegisterController = {
  registerAccount,
  verificationCode,
  loginAccount,
  forgotUsername,
  forgotPassword,
  verificationResetCode,
  resetPassword
};
