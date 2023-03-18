import VoiceContext from "./voiceContext";
import Axios from "axios";
import { useReducer } from "react";
import { Buffer } from "buffer";
import generateTranscript from "./generateTranscript";
const VoiceContextProvider = (props) => {

  const voiceStateHandler = (state, action) => {
    switch (action.type) {
      case "registerUser":
        return {
          loading: state.loading,
          ...action.data,
          registered:true
        }
      case "guessScore":
        return { ...state, guessScore: action.score };
      case "error":
        return { ...state, loading: false, error: true, errorData:{...action} }
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
      default:
        return { loading: true };
    }
  };

  const [voiceFeatures, dispatchVoiceFeatures] = useReducer(voiceStateHandler, {
    loading: true,
    error: false,
    registered:false
  });

  let uid, filePath, token, signedURL, userId;
  const generateToken = async (user) => {
<<<<<<< HEAD
    try {
      const apiKey = "2522a39b608f58b1c4767082442713896d2ffc7597abf67075bb29a5";
      const ipdata = await Axios.get(`https://api.ipdata.co?api-key=${apiKey}`);
      const userData = { ...user, ip: ipdata.data.ip };
      const uidData = await Axios.post("/api/createUser", { details: userData });
      userId = uidData.data;
=======
    const apiKey = "2522a39b608f58b1c4767082442713896d2ffc7597abf67075bb29a5";
    // 
    // const ipdata = await Axios.get(`https://api.ipdata.co?api-key=${apiKey}`);
    // console.log(ipdata.data.ip)  
    // ip: ipdata.data.ip
    const userData = { ...user,ip:"" };
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
>>>>>>> 6f9d11ce29fae731608721ff56d0ac150e9d3069

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
      dispatchVoiceFeatures({ type: "registerUser", data: { objId: userId, uid, signedURL, token, filePath } })
    }
    catch (err) {
      console.log(err)
      dispatchVoiceFeatures(
        {
          type: "error",
          content: 1,
          head: "Registration unsucessfull",
          message: "you are not registered,check your internet connection and try again...",
          btnLabel: "register again"
        }
      )
    }
  };

  const sendAudio = async (blobObj) => {
    console.log("were in");
    console.log(blobObj);
    console.log(voiceFeatures.signedURL);
    try {
      const abuffer = await blobObj.blob.arrayBuffer();

      const mybuffer = Buffer.from(abuffer, "binary");

      const res4 = await Axios.put(voiceFeatures.signedURL, mybuffer, {
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

      while (status === "IN_PROGRESS") {
        res6 = await Axios.get(
          `https://api.sondeservices.com/platform/async/v1/inference/voice-feature-scores/${jobid}`,
          {
            headers: { Authorization: voiceFeatures.token },
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
        generateTranscript(blobObj.blob, voiceFeatures.objId)
      }
      if (status === "FAIL") {
        dispatchVoiceFeatures({
          type: "error",
          content: 2,
          head: "Audio not supported",
          message: "your audio format is invalid,please re record your voice and try again...",
          btnLabel: "record again"
        });
      }
    }
    catch (err) {
      console.log(err)
      dispatchVoiceFeatures({
        type: "error",
        content: 2,
        head: "Audio not uploaded",
        message: "Something went wrong!  Please record your voice again...",
        btnLabel: "record again"
      });
    }
  };
  const voiceStuff = {
    registerUser: generateToken,
    sendAudio: sendAudio,
    voiceFeatures: voiceFeatures,
    guessScore: (value) =>
      dispatchVoiceFeatures({ type: "guessScore", score: value }),
    reset: () => dispatchVoiceFeatures({ type: "reset" })
  };
  return (
    <VoiceContext.Provider value={voiceStuff}>
      {props.children}
    </VoiceContext.Provider>
  );
};
export default VoiceContextProvider;
