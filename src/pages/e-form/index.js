import { useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BRIQUE_ACTION } from "../../store/actions";
import { formatter } from "../../helpers/formatter";
import { formStructureDummy } from "./../../dummy-data/form-structure";
import { terbilangFormat } from "../../helpers/terbilang";

const Eform = () => {
  const { formStructure } = useSelector((state) => state.briQueReducer);
  const [dynamicFields, setDynamicFields] = useState({});
  const [form] = Form.useForm();
  let { id } = useParams();
  let dataParams = JSON.parse(id);

  console.log(formStructure.fields);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(BRIQUE_ACTION.formStructureAction(dataParams.name));

    //dummy
    dispatch(BRIQUE_ACTION.setFormStructure(formStructureDummy));
  }, []);

  const handleSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const regexValidation = (constraint) => {
    if (constraint.acceptAlphabet === true && constraint.acceptNumber === false) {
      return /[A-Za-z]/;
    }
    if (constraint.acceptAlphabet === false && constraint.acceptNumber === true) {
      return /^[0-9]{0,}$/;
    }
  };
  const regexMessage = (constraint) => {
    if (constraint.acceptAlphabet === true && constraint.acceptNumber === false) {
      return "hanya masukan huruf";
    }
    if (constraint.acceptAlphabet === false && constraint.acceptNumber === true) {
      return "hanya masukan angka";
    }
  };

  return (
    <section>
      <TopBar>{dataParams.displayName}</TopBar>
      <div className="mt-5 flex flex-col items-center justify-center">
        <p className="text-white text-lg text-start">Pastikan data di bawah sudah sesuai dengan data diri kamu</p>
        <Form
          layout="vertical"
          form={form}
          // onFinish={handleSubmit}
          className="bg-white px-4 py-7 w-10/12 shadow-lg rounded-lg"
        >
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
                ]}
              >
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
            ) : data.constraint.formatCurrency === true ? (
              <Form.Item
                className={dynamicFields.datas?.find((field) => field.name === data.fieldName) ? "hidden" : "block"}
                key={index}
                name={data.fieldName}
                label={data.fieldDisplayName}
                rules={[
                  {
                    validator: async (_, value) => {
                      if (value && value.toString().length > data.maxLength > 0) {
                        return Promise.reject(`maksimal masukan ${data.maxLength} digit angka `);
                      }

                      if (!value && !dynamicFields.datas?.find((field) => field.name === data.fieldName) && data.isMandatory) {
                        return Promise.reject(`masukan ${data.fieldDisplayName} berupa angka`);
                      }
                      if (!regexValidation(data.constraint).test(value)) {
                        return Promise.reject(regexMessage(data.constraint));
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="w-full"
                  placeholder={`${data.fieldDisplayName}`}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => {
                    form.setFieldsValue({
                      terbilang: `${terbilangFormat(e)} rupiah`,
                    });
                  }}
                />
              </Form.Item>
            ) : (
              <Form.Item
                className={dynamicFields.datas?.find((field) => field.name === data.fieldName) ? "hidden" : "block"}
                key={index}
                name={data.fieldName}
                label={data.fieldDisplayName}
                rules={[
                  {
                    required: !dynamicFields.datas?.find((field) => field.name === data.fieldName) && data.isMandatory ? true : false,
                    message: `masukan ${data.fieldDisplayName}`,
                  },
                  {
                    pattern: regexValidation(data.constraint),
                    message: regexMessage(data.constraint),
                  },
                  { min: data.minLength > 0 ? data.minLength : false, message: `minimal masukan ${data.minLength} ${data.constraint.acceptNumber ? "digit angka" : "karakter"} ` },
                  { max: data.maxLength > 0 ? data.maxLength : false, message: `maksimal masukan ${data.maxLength} ${data.constraint.acceptNumber ? "digit angka" : "karakter"} ` },
                ]}
              >
                {data.fieldType === "terbilang" ? <Input placeholder={`${data.fieldDisplayName}`} size="large" readOnly /> : <Input placeholder={`${data.fieldDisplayName}`} size="large" />}
              </Form.Item>
            )
          )}
        </Form>
        <div className="sticky bottom-0 w-full z-30 bg-[#E8F3FC]  flex justify-center space-x-8 py-4 shadow-lg">
          <Button onClick={handleSubmit} type="primary" className="bg-blue-700 w-80 text-lg" size="large">
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

// {
//   /* <InputNumber size="large" className="w-full" placeholder={`${data.fieldDisplayName}`} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(value) => value.replace(/\$\s?|(,*)/g, "")} /> */
// }

// {
//   validator: (_, value) => {
//     // const regex = /^[\d,]+$/;
// if (!regexValidation(data.constraint).test(value)) {
//   return Promise.reject(regexMessage(data.constraint));
// }

//     return Promise.resolve();
//   },
// },

{
  /* <Input
prefix="Rp"
placeholder={`${data.fieldDisplayName}`}
size="large"
// maxLength={14}
onChange={(e) => {
  const value = e.target.value.replace(/,/g, "");
  const formattedValue = isNaN(value) ? e.target.value : formatter(value);
  console.log(formattedValue?.length);
  let terbilangValue = isNaN(value) ? "" : terbilangFormat(value);
  form.setFieldsValue({
    jumlahSetoran: formattedValue,
    terbilang: `${terbilangValue} rupiah`,
  });
}}
/> */
}

// ata.constraint.formatCurrency === true ? (
// <InputNumber
//   size="large"
//   className="w-full"
//   placeholder={`${data.fieldDisplayName}`}
//   formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
//   onChange={(e) => console.log(`${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
// />
// ) :
