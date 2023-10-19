import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../components/topbar";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BRIQUE_ACTION } from "../../store/actions";
import { formatter } from "../../helpers/formatter";
import { formStructureDummy } from "./../../dummy-data/form-structure";
import { terbilangFormat } from "../../helpers/terbilang";
import { openNotifications } from "../../helpers/notification";

const Eform = () => {
  const { formStructure, listForm } = useSelector(
    (state) => state.briQueReducer
  );
  const [dynamicFields, setDynamicFields] = useState([]);
  const [form] = Form.useForm();
  let { id } = useParams();
  let dataParams = JSON.parse(id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BRIQUE_ACTION.formStructureAction(dataParams.name)).catch(
      ({ errorMssg }) => {
        openNotifications("error", "Error", errorMssg);
      }
    );

    //dummy
    // dispatch(BRIQUE_ACTION.setFormStructure(formStructureDummy));
  }, []);

  console.log(formStructure);
  const navigate = useNavigate();

  const handleSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((res) => {
        let curencyKeys = formStructure.fields
          ?.filter((datas) => datas.constraint.formatCurrency === true)
          ?.map((data) => data.fieldName);
        let objKey = Object.keys(res);
        let keyTrueCurrencies = curencyKeys
          .filter((element) => objKey.includes(element))
          .toString();
        let sendForm = {
          ...res,
          [keyTrueCurrencies]: `${res[keyTrueCurrencies]}`.replace(
            /[^0-9]/g,
            ""
          ),
          briqueFormName: formStructure.formName,
        };
        if (res[keyTrueCurrencies]) {
          dispatch(
            BRIQUE_ACTION.setListForm([
              ...listForm,
              { ...dataParams, form: sendForm },
            ])
          );
        } else {
          dispatch(
            BRIQUE_ACTION.setListForm([
              ...listForm,
              {
                ...dataParams,
                form: { ...res, briqueFormName: formStructure.formName },
              },
            ])
          );
        }
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="h-full">
      <TopBar>{formStructure.formDisplayName}</TopBar>
      <div className="mt-5 flex flex-col items-center h-full">
        <p className="text-white text-lg text-start">
          Pastikan data di bawah sudah sesuai dengan data diri kamu
        </p>
        <div
          className={`w-full ${
            formStructure.fields?.length < 6 ? "h-full" : "h-auto"
          } flex justify-center`}>
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
                    onChange={(e) => {
                      let obj = data.selections?.find(
                        (datas) => datas.selection === e
                      ).dynamicFields;

                      setDynamicFields(obj);
                    }}
                    options={data.selections?.map((datas) => ({
                      label: datas.displayName,
                      value: datas.selection,
                    }))}
                  />
                </Form.Item>
              ) : dynamicFields?.find(
                  (field) => field.name === data.fieldName
                ) ? null : (
                <Form.Item
                  key={index}
                  name={data.fieldName}
                  label={data.fieldDisplayName}
                  rules={[
                    {
                      required:
                        !dynamicFields?.find(
                          (field) => field.name === data.fieldName
                        ) && data.isMandatory
                          ? true
                          : false,
                      message: `masukan ${data.fieldDisplayName}`,
                    },
                    {
                      type: data.fieldName === "email" ? "email" : false,
                      message: "masukan email yang valid",
                    },
                    {
                      min: data.minLength > 0 ? data.minLength : false,
                      message: `masukan minimal ${
                        data.minLength
                      } dan maksimal ${data.maxLength}  ${
                        data.constraint.acceptNumber
                          ? "digit angka"
                          : "karakter"
                      } `,
                    },
                  ]}>
                  {data.constraint.formatCurrency === true ? (
                    <Input
                      prefix="Rp"
                      placeholder={`${data.fieldDisplayName}`}
                      size="large"
                      maxLength={data.maxLength}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        const formattedValue = formatter(value);
                        let terbilangValue = terbilangFormat(value);
                        form.setFieldsValue({
                          [data.fieldName]: formattedValue,
                          [data.constraint.allowedSymbols.split(
                            " "
                          )[0]]: `${terbilangValue} rupiah`,
                        });
                      }}
                    />
                  ) : data.constraint.acceptNumber === true &&
                    data.constraint.acceptAlphabet === false ? (
                    <Input
                      placeholder={`${data.fieldDisplayName}`}
                      size="large"
                      maxLength={data.maxLength}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        form.setFieldsValue({
                          [data.fieldName]: value,
                        });
                      }}
                    />
                  ) : data.fieldType === "terbilang" ? (
                    <Input
                      placeholder={`${data.fieldDisplayName}`}
                      size="large"
                      readOnly
                    />
                  ) : data.constraint.acceptNumber === false &&
                    data.constraint.acceptAlphabet === true ? (
                    <Input
                      placeholder={`${data.fieldDisplayName}`}
                      size="large"
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\d+|^\s+$/g, "")
                          .replace(/\s+/g, " ");
                        form.setFieldsValue({
                          [data.fieldName]: value,
                        });
                      }}
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
        </div>
        <div className="bottom-0 w-full z-30 sticky bg-[#E8F3FC]  flex justify-center space-x-8 py-4 shadow-lg">
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

// data.constraint.formatCurrency === true ? (
//               <Form.Item
//                 className={
//                   dynamicFields.datas?.find(
//                     (field) => field.name === data.fieldName
//                   )
//                     ? "hidden"
//                     : "block"
//                 }
//                 key={index}
//                 name={data.fieldName}
//                 label={data.fieldDisplayName}
//                 trigger="onChange"
//                 rules={[
//                   {
//                     validator: async (_, value) => {
//                       if (!regexValidation(data.constraint).test(value)) {
//                         return Promise.reject(regexMessage(data.constraint));
//                       } else {
//                         return Promise.resolve();
//                       }
//                     },
//                   },
//                 ]}>
//                 <Input
//                   prefix="Rp"
//                   placeholder={`${data.fieldDisplayName}`}
//                   size="large"
//                   maxLength={14}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/,/g, "");
//                     const formattedValue = isNaN(value)
//                       ? e.target.value
//                       : formatter(value);
//                     let terbilangValue = isNaN(value)
//                       ? ""
//                       : terbilangFormat(value);
//                     form.setFieldsValue({
//                       jumlahSetoran: formattedValue,
//                       terbilang: `${terbilangValue} rupiah`,
//                     });
//                   }}
//                 />
//               </Form.Item>
//             )

//  const regexValidation = (constraint) => {
//    if (
//      constraint.acceptAlphabet === true &&
//      constraint.acceptNumber === false
//    ) {
//      return /[A-Za-z]/;
//    }
//    if (
//      constraint.acceptAlphabet === false &&
//      constraint.acceptNumber === true
//    ) {
//      return /^[0-9]{0,}$/;
//    }
//  };
//  const regexMessage = (constraint) => {
//    if (
//      constraint.acceptAlphabet === true &&
//      constraint.acceptNumber === false
//    ) {
//      return "hanya masukan huruf";
//    }
//    if (
//      constraint.acceptAlphabet === false &&
//      constraint.acceptNumber === true
//    ) {
//      return "hanya masukan angka";
//    }
//  };
