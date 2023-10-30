import axios from "axios";
import { resolve } from "path";

export const getToken = async (mySessionId: string) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

export const createSession = async (sessionId: string) => {
  const response = await axios.post(
    `/openvidu/api/sessions`,
    { customSessionId: sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The sessionId
};

export const createToken = async (sessionId: string) => {
  const response = await axios.post(
    `/openvidu/api/sessions/${sessionId}/connection`,
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The token
};
