import { useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BRIQUE_ACTION } from "../../store/actions";
import { formatRupiah } from "../../helpers/format-rupiah";

const Eform = () => {
  const { formStructure } = useSelector((state) => state.briQueReducer);
  const [dynamicFields, setDynamicFields] = useState({});
  const [inputCurency, setInputCurency] = useState(0);
  const [form] = Form.useForm();
  let { id } = useParams();
  let dataParams = JSON.parse(id);

  console.log(formStructure.fields);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BRIQUE_ACTION.formStructureAction(dataParams.name));
  }, []);

  const handleSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const regexValidation = (constraint) => {
    if (
      constraint.acceptAlphabet === true &&
      constraint.acceptNumber === false
    ) {
      return /[A-Za-z]/;
    }
    if (
      constraint.acceptAlphabet === false &&
      constraint.acceptNumber === true
    ) {
      return /^-?\d+\.?\d*$/;
    }
  };
  const regexMessage = (constraint) => {
    if (
      constraint.acceptAlphabet === true &&
      constraint.acceptNumber === false
    ) {
      return "hanya masukan huruf";
    }
    if (
      constraint.acceptAlphabet === false &&
      constraint.acceptNumber === true
    ) {
      return "hanya masukan angka";
    }
  };

  console.log(formatRupiah(parseInt(inputCurency)));

  return (
    <section>
      <TopBar>{dataParams.displayName}</TopBar>
      <div className="mt-5 flex flex-col items-center justify-center">
        <p className="text-white text-lg text-start">
          Pastikan data di bawah sudah sesuai dengan data diri kamu
        </p>
        <Form
          layout="vertical"
          form={form}
          // onFinish={handleSubmit}
          className="bg-white px-4 py-7 w-10/12 shadow-lg rounded-lg">
          {formStructure.fields?.map((data, index) =>
            data.fieldType === "selection" ? (
              <Form.Item
                key={index}
                name={data.fieldName}
                label={data.fieldDisplayName}
                rules={[
                  {
                    required: true,
                    message: `masukan ${data.fieldDisplayName}`,
                  },
                ]}>
                <Select
                  size="large"
                  placeholder={`----- Pilih ${data.fieldDisplayName} -----`}
                  onChange={(e) => setDynamicFields(JSON.parse(e))}
                  options={data.selections?.map((datas) => ({
                    label: datas.displayName,
                    value: JSON.stringify({
                      datas: datas.dynamicFields,
                      selectionId: datas.selectionId,
                    }),
                  }))}
                />
              </Form.Item>
            ) : (
              <Form.Item
                className={
                  dynamicFields.datas?.find(
                    (field) => field.name === data.fieldName
                  )
                    ? "hidden"
                    : "block"
                }
                key={index}
                name={data.fieldName}
                label={data.fieldDisplayName}
                rules={[
                  {
                    required:
                      !dynamicFields.datas?.find(
                        (field) => field.name === data.fieldName
                      ) && data.isMandatory
                        ? true
                        : false,
                    message: `masukan ${data.fieldDisplayName}`,
                  },
                  {
                    pattern: regexValidation(data.constraint),
                    message: regexMessage(data.constraint),
                  },
                ]}>
                {data.constraint.formatCurrency === true ? (
                  <InputNumber
                    defaultValue={1000}
                    size="large"
                    className="w-full"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                ) : (
                  <Input
                    placeholder={`${data.fieldDisplayName}`}
                    size="large"
                  />
                )}
              </Form.Item>
            )
          )}
        </Form>
        <div className="sticky bottom-0 w-full z-30 bg-[#E8F3FC]  flex justify-center space-x-8 py-4 shadow-lg">
          <Button
            onClick={handleSubmit}
            type="primary"
            className="bg-blue-700 w-80 text-lg"
            size="large">
            Submit{" "}
          </Button>
        </div>{" "}
      </div>
    </section>
  );
};

export default Eform;

//  data.constraint.acceptAlphabet === true &&
//                       data.constraint.acceptNumber === false
//                         ? /[A-Za-z]/
//                         : data.constraint.acceptAlphabet === false &&
//                           data.constraint.acceptNumber === true ? '' :''
