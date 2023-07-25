import VoiceContext from "./voiceContext";
import Axios from "axios";
import { useReducer } from "react";
import { Buffer } from "buffer";
import generateTranscript from "./generateTranscript";
import base from "./base";
import { browserName } from 'react-device-detect';
import axios from "axios";
const VoiceContextProvider = (props) => {

  const voiceStateHandler = (state, action) => {
    switch (action.type) {
      case "registering":
        return { ...state, registering: true }
      case "registerUser":
        return {
          loading: state.loading,
          ...action.data,
          registered: true
        }
      case "guessScore":
        return { ...state, guessScore: action.score };
      case "error":
        return { ...state, loading: false, error: true, errorData: { ...action }, registered: action.registered }
      case "reset":
        return { ...state, loading: true, error: false }
      case "results":
        return {
          ...state,
          loading: false,
          success: true,
          score: action.scores.overallScore,
          live: action.scores.live,
          energy: action.scores.energy,
        };
      case "videoData":
        return { ...state, videoData: action.videoData, videos: true }
      default:
        return { loading: true };
    }
  };

  const [voiceFeatures, dispatchVoiceFeatures] = useReducer(voiceStateHandler, {
    loading: true,
    error: false,
    registered: false,
  });

  let uid, filePath, token, signedURL, userId, userData;
  const generateToken = async (user) => {
    try {
      dispatchVoiceFeatures({ type: "registering" })
      // const apiKey = "2522a39b608f58b1c4767082442713896d2ffc7597abf67075bb29a5";
      try {
        const ipdata = await Axios.post("/api/ip");
        userData = { ...user, ip: ipdata.data };
      }
      catch (er) {
        console.log(er)
        userData = { ...user, ip: "0.0.0.0" }
      }
      console.log(userData)
      const uidData = await Axios.post("/api/createUser", { details: userData });
      userId = uidData.data;
      const res1 = await Axios.post(
        "https://api.sondeservices.com/platform/v1/oauth2/token",
        {
          grant_type: "client_credentials",
          scope:
            "sonde-platform/users.write sonde-platform/voice-feature-scores.write sonde-platform/voice-feature-scores.read sonde-platform/storage.write",
        },
        {
          headers: {
            Authorization:
              "Basic MmpkbDRkdWtkbzM2bDBlbmpmYjZwODk1YmQ6MXAyZnI4ZmxkOHRyc2lpdGsxdGF0NzJwY3FrdWtuYTg3ZW1yNzA3cWo1bjNsbHJsdjh1cA==",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      token = res1.data.access_token;
      console.log(token);
      const res2 = await Axios.post(
        "https://api.sondeservices.com/platform/v2/users",
        {
          yearOfBirth: user.year,
          gender: user.gender,
          language: "ENGLISH",
          device: {
            type: "MOBILE",
            manufacturer: "VIVO",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      uid = res2.data.userIdentifier;

      const res3 = await Axios.post(
        "https://api.sondeservices.com/platform/v1/storage/files",
        {
          fileType: "wav",
          countryCode: "IN",
          userIdentifier: uid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      signedURL = res3.data.signedURL;
      filePath = res3.data.filePath;
      console.log(filePath);
      console.log(signedURL);
      dispatchVoiceFeatures({ type: "registerUser", data: { objId: userId, uid, signedURL, token, filePath, ip: userData.ip } })
    }
    catch (err) {
      console.log(err.message)
      console.log(typeof (err))
      if (err.response) await axios.post("/api/logError", { ip: userData.ip, browser: browserName, error: err.response })
      else await axios.post("/api/logError", { ip: userData.ip, browser: browserName, error: err.message })
      dispatchVoiceFeatures(
        {
          type: "error",
          content: 1,
          head: "Registration unsucessfull",
          message: "check your internet connection and try again..",
          btnLabel: "register again",
          registered: false
        }
      )
    }
  };

  const sendAudio = async (blobObj) => {
    console.log("were in");
    console.log(blobObj);
    console.log(voiceFeatures.signedURL);
    try {
      // const abuffer = await blobObj.blob.arrayBuffer();
      // console.log(base)
      // const mybuffer = Buffer.from(base, "base64");

      const res4 = await Axios.put(voiceFeatures.signedURL, blobObj, {
        headers: { "Content-Type": "audio/wav" },
      });

      console.log(res4.status);
      console.log(voiceFeatures)
      const res5 = await Axios.post(
        "https://api.sondeservices.com/platform/async/v1/inference/voice-feature-scores",
        {
          infer: [
            {
              type: "Acoustic",
              version: "v4",
            },
          ],
          userIdentifier: voiceFeatures.uid,
          filePath: voiceFeatures.filePath,
          measureName: "mental-fitness",
        },
        {
          headers: {
            Authorization: voiceFeatures.token,
            "Content-Type": "application/json",
          },
        }
      );

      const jobid = res5.data.jobId;
      console.log("jobid" + jobid);
      let res6;
      let status = "IN_PROGRESS";

      while (status === "IN_PROGRESS" || status === "READY") {
        res6 = await Axios.get(
          `https://api.sondeservices.com/platform/async/v1/inference/voice-feature-scores/${jobid}`,
          {
            headers: { Authorization: voiceFeatures.token },
          }
        );
        status = res6.data.status;
        console.log(status)
      }
      if (status === "DONE") {
        const inference = res6.data.result.inference[0];
        const score = inference.score.value;
        const liveIndex = inference.voiceFeatures.findIndex(
          (el) => el.name === "Liveliness"
        );
        const EnergyIndex = inference.voiceFeatures.findIndex(
          (el) => el.name === "Energy Range"
        );
        const liveScore = inference.voiceFeatures[liveIndex].score;
        const EnergyScore = inference.voiceFeatures[EnergyIndex].score;
        console.log("Total score" + score);
        console.log("Live Score", liveScore);
        console.log("EnergyScore", EnergyScore);
        await Axios.post("/api/scores", {
          id: voiceFeatures.objId,
          score,
          voiceFeatures: inference.voiceFeatures,
          audio: voiceFeatures.signedURL,
        });
        dispatchVoiceFeatures({
          type: "results",
          scores: { overallScore: score, live: liveScore, energy: EnergyScore },
        });
        generateTranscript(blobObj, voiceFeatures.objId)
        const videoRes = await Axios.post("/api/videosData", { objId: voiceFeatures.objId });
        console.log(videoRes.data)
        dispatchVoiceFeatures({ type: "videoData", videoData: videoRes.data })
      }
      if (status === "FAIL") {
        console.log(res6)
        await axios.post("/api/logError", { ip: voiceFeatures.ip, browser: browserName, error: res6.data.result})
        if (res6.data.result.code === "INVALID_AUDIO_FILE") {
          dispatchVoiceFeatures({
            type: "error",
            content: 2,
            head: "Invalid Audio",
            message: "check if microphone is in use by any other application",
            btnLabel: "record again",
            registered: true
          });
        }
        dispatchVoiceFeatures({
          type: "error",
          content: 2,
          head: "Audio not supported",
          message: "your audio format is invalid,please re record your voice and try again...",
          btnLabel: "record again",
          registered: true
        });
      }
    }
    catch (err) {
      console.log(err)
      console.log(typeof (err))
      if (err.response) await axios.post("/api/logError", { ip: voiceFeatures.ip, browser: browserName, error: err.response })
      else await axios.post("/api/logError", { ip: voiceFeatures.ip, browser: browserName, error: err.message })
      dispatchVoiceFeatures({
        type: "error",
        content: 2,
        head: "Audio not uploaded",
        message: "Something went wrong!  Please record your voice again...",
        btnLabel: "record again",
        registered: true
      });
    }
  };
  const voiceStuff = {
    registerUser: generateToken,
    sendAudio: sendAudio,
    voiceFeatures: voiceFeatures,
    guessScore: (value) =>
      dispatchVoiceFeatures({ type: "guessScore", score: value }),
    reset: () => dispatchVoiceFeatures({ type: "reset" }),
    block: () => dispatchVoiceFeatures({
      type: "error",
      content: 2,
      head: "This browser is not supported.",
      message: "To use AI powered Stress Assistant, we recommend using the latest version of Chrome, Firefox, Safari or Microsoft Edge.",
      btnLabel: "record again",
      hideButton: true
    }),
    failAuth: () => dispatchVoiceFeatures({
      type: "error",
      content: 1,
      head: "Authentication failed.",
      message: "You are not registered,click here to continue as a visitor",
      btnLabel: "continue as a visitor",
    })
  };
  return (
    <VoiceContext.Provider value={voiceStuff}>
      {props.children}
    </VoiceContext.Provider>
  );
};
export default VoiceContextProvider;
