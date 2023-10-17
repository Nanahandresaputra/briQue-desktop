import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { useState } from "react";
import TopBar from "../../components/topbar";
import FooterSubmit from "../../components/get-photo/footer-submit";
import { useNavigate } from "react-router-dom";

const width = 400;
const height = 450;

const GetPhoto = () => {
  const { webcamRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      model: "short",
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  const navigate = useNavigate();

  const [getCaputre, setCapture] = useState(null);

  const capture = () => {
    let photo = webcamRef.current.getScreenshot();
    setCapture(photo);
    navigate("/multi-form");
  };

  return (
    <section className="h-full">
      <TopBar>Data Nasabah</TopBar>
      <div className="py-7 bg-black bg-opacity-75 flex flex-col items-center justify-center">
        <div style={{ width, height, position: "relative" }} className="z-10">
          {boundingBox.map((box, index) => (
            <div
              key={`${index + 1}`}
              style={{
                border: "4px solid blue",
                position: "absolute",
                top: `${box.yCenter * 100}%`,
                left: `${box.xCenter * 100}%`,
                width: `${box.width * 100}%`,
                height: `${box.height * 100}%`,
                zIndex: 1,
              }}
            />
          ))}
          <Webcam
            ref={webcamRef}
            forceScreenshotSourceSize
            style={{
              height,
              width,
              position: "absolute",
            }}
          />
        </div>
        <p className="text-white text-center text-lg font-semibold">
          [Ambil Gambar]
        </p>
        <FooterSubmit getCapture={capture} />
      </div>
    </section>
  );
};

export default GetPhoto;
