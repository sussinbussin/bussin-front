import { COGNITO_ENDPOINT, COGNITO_CLIENTID } from "@env";
import ky from "ky";

const api = ky.create({
  prefixUrl: COGNITO_ENDPOINT,
});

/*
 * We are doing it this way because we to conform it to a hook
 * syong yue teach me one i like it this way albeit abit mafan
 * */
const useLoginAPI = (username, password) => {
  const loginUser = async () => {
    let data = null;

    try {
      const res = await api.post("", {
        json: {
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
          },
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: COGNITO_CLIENTID,
        },
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          "Content-Type": "application/x-amz-json-1.1",
        },
      });
      data = await res.json();
      //TODO: data validation and error handling
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return { loginUser };
};

export { useLoginAPI };
