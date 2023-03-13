import VoiceContext from "./voiceContext";
import Axios from "axios";
import { useReducer, useState } from "react";
import { Buffer } from "buffer";
const VoiceContextProvider = (props) => {
  let name;
  const voiceStateHandler = (state, action) => {
    switch (action.type) {
      case "guessScore":
        return { ...state, guessScore: action.score };
      case "results":
        return {
          ...state,
          loading: false,
          score: action.scores.overallScore,
          live: action.scores.live,
          energy: action.scores.energy,
          userId: action.userId,
          userName:action.userName
        };
      default:
        return { loading: true };
    }
  };

  const [voiceFeatures, dispatchVoiceFeatures] = useReducer(voiceStateHandler, {
    loading: true,
  });

  let uid, filePath, token, signedURL, userId;
  const generateToken = async (user) => {
    const apiKey = "2522a39b608f58b1c4767082442713896d2ffc7597abf67075bb29a5";
    const ipdata = await Axios.get(`https://api.ipdata.co?api-key=${apiKey}`);
    const userData = { ...user, ip: ipdata.data.ip };
    const uidData = await Axios.post("/api/createUser", { details: userData });
    userId = uidData.data;
    name = user.username;
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
  };

  const sendAudio = async (blobObj) => {
    console.log("were in");
    console.log(blobObj);
    console.log(signedURL);
    const abuffer = await blobObj.blob.arrayBuffer();

    const mybuffer = Buffer.from(abuffer, "binary");

    const res4 = await Axios.put(signedURL, mybuffer, {
      headers: { "Content-Type": "audio/wav" },
    });

    console.log(res4.status);

    const res5 = await Axios.post(
      "https://api.sondeservices.com/platform/async/v1/inference/voice-feature-scores",
      {
        infer: [
          {
            type: "Acoustic",
            version: "v3",
          },
        ],
        userIdentifier: uid,
        filePath: filePath,
        measureName: "mental-fitness",
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const jobid = res5.data.jobId;
    console.log("jobid" + jobid);
    let res6;
    let status = "IN_PROGRESS";

    while (status === "IN_PROGRESS") {
      res6 = await Axios.get(
        `https://api.sondeservices.com/platform/async/v1/inference/voice-feature-scores/${jobid}`,
        {
          headers: { Authorization: token },
        }
      );
      status = res6.data.status;
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
      dispatchVoiceFeatures({
        type: "results",
        scores: { overallScore: score, live: liveScore, energy: EnergyScore },
        userId: userId,
        userName: name,
      });
      await Axios.post("/api/scores", {
        id:userId ,
        score,
        voiceFeatures: inference.voiceFeatures,
        audio: blobObj.url,
      });
    }
    if (status === "FAIL") {
      console.log("something went wrong..");
    }
  };
  const voiceStuff = {
    registerUser: generateToken,
    sendAudio: sendAudio,
    voiceFeatures: voiceFeatures,
    guessScore: (value) =>
      dispatchVoiceFeatures({ type: "guessScore", score: value }),
  };
  return (
    <VoiceContext.Provider value={voiceStuff}>
      {props.children}
    </VoiceContext.Provider>
  );
};
export default VoiceContextProvider;
