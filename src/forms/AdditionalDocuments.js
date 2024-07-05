import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getById, getList, save } from "../api_services/SharedServices";
import { Image_Base_Url, urls } from "../api_services/url";
import { UseFormValidations } from "../validations/UseFormValidation";
import { useParams } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";

const AdditionalDocuments = ({ formname, SetisSubmitted }) => {
  const [update, setUpdate] = useState();
  const [additionaldocData, setAdditionaldocData] = useState();
  const { providerId } = useParams();

  console?.log(additionaldocData, "additionaldocData");

  const submit = async () => {
    let formdata = new FormData();
    let array = [
      {
        id: 0,
        providerId: providerId,
        appointmentId: formname?.appointmentId,
        templateType: "Health Documents",
        formId: formname?.formId,
        documentName: data?.documentName,
        documentDescription: data?.documentDescription,
        documentType: "Additional Document",
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", data?.image);
    let res = await save(urls?.forms?.saveAdditonalDoc, formdata);
    setValues({});
    console?.log(res?.data?.status, "res?.data?.status");
    if (res?.data?.status) {
      setUpdate(res);
    }
  };

  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    handleDateChange,
    setValues,
    handleImageUpload,
  } = UseFormValidations({
    initialValues: {
      documentName: "",
    },
    validationSchema: {
      documentName: {
        required: {
          value: true,
          message: "Please enter your Document Name",
        },
      },
      image: {
        required: {
          value: true,
          message: "Please upload document",
        },
      },
    },
    submit: submit,
  });
  console?.log(data, "check");

  const getAdditionaldocData = async () => {
    let jsonObjects = {
      documentType: "Additional Document",
      appointmentId: formname?.appointmentId,
    };
    let res = await getList(urls?.forms?.getAdditionalDoc, { jsonObjects });
    setAdditionaldocData(res || []);
  };

  const Deleteuploads = async (Id) => {
    let jsonObjects = { uploadId: Id };
    let res = await save(urls?.forms?.deleteuploads, { jsonObjects });
    if (res) {
      setUpdate(res);
    }
  };

  useEffect(() => {
    getAdditionaldocData();
  }, [providerId, update]);

  useEffect(() => {}, [additionaldocData]);

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control  bg-white ";
  };

  const returnvalue = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };

  return (
    <>
      <div className="row bg-white p-2 mt-2">
        <div className="f20 medium pt-3">Document List</div>
        <div className="p-4">
          {additionaldocData &&
            additionaldocData?.map((v) => {
              return (
                <div className="row border-top-bottom py-2">
                  <div className="col-3 link-hover-line f14">
                    {v?.documentName}
                  </div>
                  <div className="col-5 f14">{v?.documentDescription}</div>
                  <div className="col-3 f14">{v?.originalFileName}</div>
                  <div className="col-auto">
                    {
                      <>
                        <a
                          href={Image_Base_Url + `/FormUploads/${v?.fileName}`}
                          target={"_blank"}
                          download={true}
                        >
                          <FaCloudDownloadAlt size={20} />
                        </a>
                        <MdDelete
                          size={20}
                          className="pointer"
                          onClick={() => Deleteuploads(v?.uploadId)}
                        />
                      </>
                    }
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row bg-white p-2 mt-2">
          <div className="f20 medium pt-3">Upload Documents</div>
          <div className="row ">
            <div className="col-md-4 py-4 ">
              <div className="">
                <label>
                  Document Name <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("documentName")}
                  placeholder="Certifying Board…"
                  name="documentName"
                  value={returnvalue("documentName")}
                  onChange={handleChange("documentName")}
                />
              </div>
              <div className="mt-3">
                <label>Description</label>
                <textarea
                  className="p-2 "
                  cols={6}
                  placeholder="Description"
                  name="documentDescription"
                  value={returnvalue("documentDescription")}
                  onChange={handleChange("documentDescription")}
                />
              </div>
            </div>
            <div className="col-md-6 px-4">
              <div>
                <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3 ">
                  <div className="text-center py-2 mt-1 ">
                    <IoCloudUploadOutline
                      color="#9C9CA8"
                      opacity={0.49}
                      style={{ height: "36px", width: "42px" }}
                      className="me-2"
                    />
                    <div
                      className="f18 px-4 mt-2"
                      style={{ height: "46px", color: "#3A3952" }}
                    >
                      Upload your documents or <br /> drag and drop in this box
                    </div>

                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      accept=".pdf,.doc,.docx"
                      name="image"
                      onChange={handleImageUpload("image")}
                    />

                    <div
                      className="  upload40 d-flex justify-content-center align-items-center"
                      style={{
                        background: "#3A3952B3",
                        marginLeft: "132.5px",
                        marginRight: "133.5px",
                      }}
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Upload
                    </div>
                  </div>
                </div>
                {errors && errors.image && (
                  <p className="text text-danger">{errors.image}</p>
                )}
              </div>
            </div>
            <hr className=" mt-5" style={{ marginLeft: "10px" }} />
            <div className="py-3">
              <button
                type="submit"
                disabled={formname?.isLogged == "Yes"}
                style={{ background: formname?.isLogged=="Yes"?"#649dff":"#00B948" }}
                className=" text-white col-md-2 f16 medium border rounded py-2 pointer"
              >
                Add Document(s)
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdditionalDocuments;
