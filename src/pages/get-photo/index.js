import Webcam from "react-webcam";
import { useRef, useState } from "react";
import TopBar from "../../components/topbar";
import FooterSubmit from "../../components/get-photo/footer-submit";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Modal } from "antd";
import { BRIQUE_ACTION } from "../../store/actions";

const GetPhoto = () => {
  const { photoBase64, getEmail } = useSelector((state) => state.briQueReducer);

  let { state } = useLocation();

  const webcamRef = useRef(null);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const capture = () => {
    let photo = webcamRef.current.getScreenshot();
    dispatch(BRIQUE_ACTION.setPhotoBase64(photo));
  };

  let navigateToForm = () => {
    if (state?.length > 1) {
      navigate("/multi-form", { state: { getServices: state, getEmail } });
    } else {
      let params = JSON.stringify({
        name: state?.[0].name,
        id: state?.[0].id,
      });
      navigate(`/eform/${params}`, { state: params });
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
    <section className="h-screen">
      <Modal
        title="Masukan email"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
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
            ]}>
            <Input placeholder="masukan email" size="large" />
          </Form.Item>
        </Form>
      </Modal>

      <TopBar>Data Nasabah</TopBar>
      <div className="py-7 bg-black bg-opacity-75 flex flex-col items-center lg:mt-12 h-screen">
        <div
          // style={{ position: "relative" }}
          className={`flex flex-col items-center z-10`}>
          <Webcam
            ref={webcamRef}
            forceScreenshotSourceSize
            className={`${
              photoBase64 ? "hidden" : "block"
            } h-[380px]  w-[350px] 2xl:h-[520px] 2xl:w-[450px] mt-16 object-cover  `}
          />
          <img
            src={photoBase64}
            alt="foto nasabah"
            className={`${
              photoBase64 ? "block" : "hidden"
            } h-[380px]  w-[350px] 2xl:h-[520px] 2xl:w-[450px] mt-16  object-cover   `}
          />
          <p className="text-white text-center text-lg font-semibold">
            [Foto Nasabah]
          </p>
        </div>
        <FooterSubmit
          navigateToForm={navigateToForm}
          showModal={showModal}
          capture={capture}
          photoBase64={photoBase64}
        />
      </div>
    </section>
  );
};

export default GetPhoto;

// const { webcamRef, boundingBox } = useFaceDetection({
//   faceDetectionOptions: {
//     model: "short",
//   },
//   faceDetection: new FaceDetection.FaceDetection({
//     locateFile: (file) =>
//       `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
//   }),
//   camera: ({ mediaSrc, onFrame }) =>
//     new Camera(mediaSrc, {
//       onFrame,
//       width,
//       height,
//     }),
// });

//  {
//    boundingBox.map((box, index) => (
//      <div
//        className={`${photoBase64 ? "hidden" : "block"} `}
//        key={`${index + 1}`}
//        style={{
//          border: "4px solid blue",
//          position: "absolute",
//          top: `${box.yCenter * 100}%`,
//          left: `${box.xCenter * 100}%`,
//          width: `${box.width * 100}%`,
//          height: `${box.height * 100}%`,
//          zIndex: 1,
//        }}
//      />
//    ));
//  }
