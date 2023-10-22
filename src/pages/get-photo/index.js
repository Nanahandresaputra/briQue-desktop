import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { useState } from "react";
import TopBar from "../../components/topbar";
import FooterSubmit from "../../components/get-photo/footer-submit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Modal } from "antd";
import { BRIQUE_ACTION } from "../../store/actions";

const width = 400;
const height = 450;

const GetPhoto = () => {
  const { getServices, photoBase64 } = useSelector((state) => state.briQueReducer);

  const { webcamRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      model: "short",
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const capture = () => {
    let photo = webcamRef.current.getScreenshot();
    dispatch(BRIQUE_ACTION.setPhotoBase64(photo));
  };

  let navigateToForm = () => {
    if (getServices?.length > 1) {
      navigate("/multi-form");
    } else {
      let params = JSON.stringify({
        name: getServices[0].name,
        id: getServices[0].id,
      });
      navigate(`/eform/${params}`);
    }
  };

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    form
      .validateFields()
      .then((res) => {
        dispatch(BRIQUE_ACTION.setGetEmail(res.email));
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="h-full">
      <Modal title="Masukan email" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "masukan email yang valid",
              },
              {
                required: true,
                message: "masukan email yang valid",
              },
            ]}
          >
            <Input placeholder="masukan email" size="large" />
          </Form.Item>
        </Form>
      </Modal>

      <TopBar>Data Nasabah</TopBar>
      <div className="py-7 bg-black bg-opacity-75 flex flex-col items-center justify-center">
        <div style={{ width, height, position: "relative" }} className=" z-10">
          {boundingBox.map((box, index) => (
            <div
              className={`${photoBase64 ? "hidden" : "block"} `}
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
          <Webcam ref={webcamRef} forceScreenshotSourceSize className={`${photoBase64 ? "hidden" : "block"} h-[${height}] w-[${width}] absolute`} />
          <img src={photoBase64} alt="foto nasabah" className={`${photoBase64 ? "block" : "hidden"} h-[${height}] w-[${width}] absolute `} />
        </div>
        <p className="text-white text-center text-lg font-semibold">[Foto Nasabah]</p>
        <FooterSubmit navigateToForm={navigateToForm} showModal={showModal} capture={capture} photoBase64={photoBase64} />
      </div>
    </section>
  );
};

export default GetPhoto;
