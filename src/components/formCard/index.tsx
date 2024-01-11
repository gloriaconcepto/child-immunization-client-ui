import React, { useState } from "react";
import { Button, Alert, Form, Input, Spin, Select, Radio, Modal } from "antd";
import type { RadioChangeEvent } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  DeleteFilled,
  DeleteTwoTone
} from "@ant-design/icons";
import "./formcontainer.scss";
import Icon from "../../SVGs";
import ProgressLevel from "../progressComponent";
import { nigeriaData } from "../../states";
import { ScreenMode } from "./types";
import { Months, NumberOfImumminzed } from "../../months";
const maxStep = 2;
const FormItem = Form.Item;
const { Option } = Select;

type nigeriaType = {
  state: string;
  alias: string;
  lgas: string[];
};
const FormContainer: React.FC = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState<number>(1);
  const [indexTt, setIndex] = useState<number[]>([]);
  const [screenMode, setScreenMode] = useState<string>(
    ScreenMode.GUARDIAN_FORM
  );
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [lga, setLga] = useState<any>([]);
  const [guardianData, setGuardianData] = useState<any>({});
  const [congratulationModal, setCongratulationModal] = useState<boolean>(false);

 
  const stateFieldChange = (value: string) => {
    form.setFieldsValue({
      lga: ""
    });
    if (value && nigeriaData) {
      setLga(returnLgas(nigeriaData, value));
    }
  };
  const returnLgas = (data: nigeriaType[], searchItem: string) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].state === searchItem) {
          return data[i].lgas;
        }
      }
    }
    return [];
  };

  const setScreenModeFunc = (mode: string) => {
    if (mode === ScreenMode.BABY_FORM) {
      setScreenMode(ScreenMode.BABY_FORM);
      setStep(2);
    } else {
      setScreenMode(ScreenMode.GUARDIAN_FORM);
      setIndex([]);
      setStep(1);
    }
  };
  const setImmunizationMonths = (e: any, key: number) => {
    if (e.target.value === "yesimmunized") {
      if (!indexTt?.includes(key)) {
        let tempArry: number[] = [...indexTt];

        if (indexTt.length > 0) {
          tempArry[key] = key;

          setIndex(tempArry);
        } else {
          tempArry.push(key);
          setIndex(tempArry);
        }
      }
    } else {
      let removedArry: number[] = [...indexTt];
      if (removedArry.length > 0 && key) {
        removedArry.splice(key, 1);
        setIndex(removedArry);
      } else {
        setIndex([]);
      }
    }
  };

  const handleFieldChange = () => {
    if (screenMode === ScreenMode.GUARDIAN_FORM) {
      const { parentfirstname, state, lga, phonenumbers } =
        form.getFieldsValue();

      if (
        parentfirstname &&
        state &&
        lga &&
        phonenumbers?.length > 0 &&
        phonenumbers[0] !== ""
      ) {
        setShowNextButton(true);
      } else {
        setShowNextButton(false);
      }
    }
  };

  const onFinish = () => {
    const formValues = form.getFieldsValue();
    // console.log("Received values of KK:", formValues);

    if (Object.keys(guardianData).length > 0) {
      // console.log(guardianData);
      let data = {
        guardianData,
        babydata: formValues?.babydata
      };
      console.log("final output", data);
      setTimeout(() => {
        setCongratulationModal(true);
      }, 4000);
    }
  };
  const onContinue = () => {
    const guardianFormData = form.getFieldsValue();
    console.log(guardianFormData);
    setScreenModeFunc(ScreenMode.BABY_FORM);
    setGuardianData(guardianFormData);
  };
  const onCloseCongratModal=()=>{
    setScreenModeFunc(ScreenMode.GUARDIAN_FORM);
    setGuardianData({});
    setCongratulationModal(false);
    setStep(1);
    setShowNextButton(false);
    setIndex([]);
    form.resetFields();
  }
  return (
    <>
      <div className="formcontainer">
        <div className="img-center-wrapper">
          <img src={Icon.BabyCenter} alt="baby center" className="img-center" />
        </div>

        <ProgressLevel level={step}/>
        <div className="section-setting" style={{ marginTop: "10px" }}>
          <span className="step-label">Step</span>
          <span
            className="step-label"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            {step}
          </span>
          <span className="step-label">of</span>
          <span
            className="step-label"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            {maxStep}
          </span>
          <h1 className="h1-label">
            {screenMode === ScreenMode.GUARDIAN_FORM
              ? "Guardian’s Personal Information"
              : "Baby’s Information"}
          </h1>
          <div>
            <span className="small-label">
              Please fill in the form below to continue
            </span>
          </div>
        </div>

        <div className="section-setting form-wrapper">
          <Form
            layout="vertical"
            form={form}
            name="form"
            onValuesChange={handleFieldChange}
            onFinish={onFinish}
          >
            {screenMode === ScreenMode.GUARDIAN_FORM && (
              <FormItem
                label={<span className="form-label">First Name</span>}
                rules={[
                  { required: true, message: "Please input your first name!" }
                ]}
                name="parentfirstname"
              >
                <Input
                  size="large"
                  placeholder=""
                  className="input-border-rd"
                />
              </FormItem>
            )}

            {screenMode === ScreenMode.GUARDIAN_FORM && (
              <FormItem
                label={<span className="form-label">Other Name</span>}
                name="parentothername"
              >
                <Input
                  size="large"
                  placeholder=""
                  className="input-border-rd"
                />
              </FormItem>
            )}

            {screenMode === ScreenMode.GUARDIAN_FORM && (
              <FormItem
                label={<span className="form-label">Where are you from?</span>}
                rules={[
                  { required: true, message: "Please select your state" }
                ]}
                name="state"
              >
                <Select
                  placeholder="Select state"
                  optionFilterProp="children"
                  size="large"
                  // showSearch
                  allowClear={false}
                  className="input-border-rd"
                  onChange={stateFieldChange}
                >
                  {nigeriaData.map((val) => (
                    <Option key={val.alias} value={val.state} name={val.state}>
                      {val.state}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            )}
            {screenMode === ScreenMode.GUARDIAN_FORM && (
              <FormItem
                label={
                  <span className="form-label">Your Local Govt. Area</span>
                }
                rules={[{ required: true, message: "Please select your LGA" }]}
                name="lga"
              >
                <Select
                  placeholder="Select LGA"
                  optionFilterProp="children"
                  size="large"
                  // showSearch
                  allowClear={false}
                  // onChange={stateFieldChange}
                >
                  {lga.map((lga: string, index: string) => (
                    <Option key={index} value={lga} name={lga}>
                      {lga}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            )}
            {screenMode === ScreenMode.GUARDIAN_FORM && (
              <FormItem
                label={<span className="form-label">Which Ward?</span>}
                name="ward"
              >
                <Input
                  size="large"
                  placeholder="Enter Ward"
                  className="input-border-rd"
                />
              </FormItem>
            )}
            {screenMode === ScreenMode.GUARDIAN_FORM && (
              <Form.List name="phonenumbers" initialValue={[""]}>
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map(({ name, key }) => (
                        <FormItem key={key} noStyle>
                          <div className="flex-tt">
                            <FormItem
                              className="w-85 mr-2"
                              label={
                                <span className="form-label">
                                  {"Phone Number"}
                                </span>
                              }
                              name={[name]}
                              key={key}
                              rules={[
                                {
                                  pattern: new RegExp(/^[ A-Za-z0-9]*$/),
                                  message: "Special character not allowed"
                                },
                                {
                                  pattern: new RegExp(/^[0-9]*$/),
                                  message: "Only Numbers are allowed"
                                },
                                {
                                  pattern: new RegExp(
                                    /^(?:\+234|0|234)[789][01]\d{8}$/
                                  ),
                                  message: "Enter Valid Phone Number"
                                },
                                {
                                  required: true,
                                  message: "Please enter your phone number"
                                }
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="080280000000"
                                className="input-border-rd"
                                prefix={
                                  <img
                                    src={Icon.NigeriaFlagIcon}
                                    alt="Nigeria Flag"
                                    // className="img-center"
                                  />
                                }
                              />
                            </FormItem>
                            {fields.length > 1 ? (
                              <div
                                onClick={() => remove(name)}
                                className="pt-4rem"
                              >
                                <img src={Icon.DeleteIcon} alt="Delete-Icon" />
                                <span className="remove-label pt-4">
                                  Remove
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </FormItem>
                      ))}
                      <FormItem>
                        <div onClick={() => add()}>
                          <PlusOutlined className="add-icon-color" />
                          <span className="add-label">Add another</span>
                        </div>
                      </FormItem>
                    </>
                  );
                }}
              </Form.List>
            )}

            {screenMode === ScreenMode.BABY_FORM && (
              <Form.List name="babydata" initialValue={[""]}>
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map(({ name, key, ...restField }) => (
                        <React.Fragment key={key}>
                          {fields.length > 1 ? (
                            <div
                              onClick={() => remove(name)}
                              className="baby-remove-icon"
                            >
                              <img src={Icon.DeleteIcon} alt="Delete-Icon" />
                              <span className="remove-label pt-4">Remove</span>
                            </div>
                          ) : null}
                          <FormItem
                            {...restField}
                            label={
                              <span className="form-label">
                                Baby First Name
                              </span>
                            }
                            rules={[
                              {
                                required: true,
                                message: "Please input baby first name!"
                              }
                            ]}
                            name={[name, "babyfirstname"]}
                          >
                            <Input
                              size="large"
                              placeholder=""
                              className="input-border-rd"
                            />
                          </FormItem>
                          <FormItem
                            label={
                              <span className="form-label">
                                Baby Other Name
                              </span>
                            }
                            name={[name, "babyothername"]}
                            {...restField}
                          >
                            <Input
                              size="large"
                              placeholder=""
                              className="input-border-rd"
                            />
                          </FormItem>
                          <FormItem
                            label={
                              <span className="form-label">
                                Baby’s Age (in months){" "}
                              </span>
                            }
                            rules={[
                              {
                                required: true,
                                message: "Please select baby age in months"
                              }
                            ]}
                            name={[name, "babyage"]}
                            {...restField}
                          >
                            <Select
                              placeholder="Select Baby age in months"
                              optionFilterProp="children"
                              size="large"
                              allowClear={false}
                            >
                              {Months.map((month: number, index: number) => (
                                <Option key={index} value={month} name={month}>
                                  {month}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                          <FormItem
                            label={
                              <span className="form-label">Baby’s Gender </span>
                            }
                            rules={[
                              {
                                required: true,
                                message: "Please select Baby Gender"
                              }
                            ]}
                            name={[name, "babygender"]}
                            {...restField}
                          >
                            <Radio.Group>
                              <Radio value={"male"} className="radio-check">
                                Male
                              </Radio>
                              <Radio value={"female"} className="radio-check">
                                Female
                              </Radio>
                            </Radio.Group>
                          </FormItem>
                          <FormItem
                            label={
                              <span className="form-label">
                                Has the baby been immunized before?{" "}
                              </span>
                            }
                            rules={[
                              { required: true, message: "Please answer this" }
                            ]}
                            name={[name, "babyimmunizedbefore"]}
                            {...restField}
                          >
                            <Radio.Group
                              onChange={(e) => setImmunizationMonths(e, key)}
                            >
                              <Radio
                                value={"yesimmunized"}
                                className="radio-check"
                              >
                                Yes, he/she has
                              </Radio>
                              <Radio
                                value={"noimmunized"}
                                className="radio-check"
                              >
                                Not at all
                              </Radio>
                            </Radio.Group>
                          </FormItem>
                          {indexTt[key] === key && (
                            <FormItem
                              label={
                                <span className="form-label">
                                  How many time has the baby been immunized?
                                </span>
                              }
                              name={[name, "babybeenimmunizdd"]}
                              {...restField}
                            >
                              <Select
                                optionFilterProp="children"
                                size="large"
                                allowClear={false}
                              >
                                {NumberOfImumminzed.map(
                                  (num: number, index: number) => (
                                    <Option key={index} value={num} name={num}>
                                      {num}
                                    </Option>
                                  )
                                )}
                              </Select>
                            </FormItem>
                          )}
                        </React.Fragment>
                      ))}
                      <FormItem>
                        <div>
                          <PlusOutlined
                            className="add-icon-color"
                            onClick={() => add()}
                          />
                          <span className="add-label" onClick={() => add()}>
                            Add another baby
                          </span>
                        </div>
                      </FormItem>
                    </>
                  );
                }}
              </Form.List>
            )}

            {screenMode === ScreenMode.GUARDIAN_FORM && showNextButton && (
              <Button className="button-wrapper" onClick={onContinue}>
                <span className="button-text">Continue</span>
              </Button>
            )}

            {screenMode === ScreenMode.BABY_FORM && (
              <Form.Item noStyle shouldUpdate>
                {({ getFieldsValue }) => {
                  return (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length > 0
                      }
                      className={
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length > 0
                          ? "button-wrapper-not-valid"
                          : "button-wrapper"
                      }
                      //  onClick={onFinish}
                    >
                      Submit form
                    </Button>
                  );
                }}
              </Form.Item>
            )}
            {screenMode === ScreenMode.BABY_FORM && (
              <div
                className="go-back-wrapper"
                onClick={() => setScreenModeFunc(ScreenMode.GUARDIAN_FORM)}
              >
                <span className="go-back">Go back</span>
              </div>
            )}
          </Form>
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        closeIcon={false}
        centered
        className="modal-congratulation"
        // width={'80%'}
        open={congratulationModal}
        onCancel={onCloseCongratModal}
        footer={null}
        width="50%"
      >
        <div>
          <img src={Icon.CongratGifIcon} alt="congratulation-icon" />
        
        </div>
        <div>
          <span className="congra-text-big ">Yaay! Congratulations</span>
        </div>
        <div style={{marginTop:'14px'}}>
          <span className="congra-text-small">Your form has been submitted succesfully</span>
        </div>

        <Button className="button-congra" onClick={onCloseCongratModal}>
                <span className="congra-butt-text">Close</span>
              </Button>
      </Modal>
    </>
  );
};

export default FormContainer;
