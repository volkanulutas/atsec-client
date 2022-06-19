import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup, Label, Input } from "reactstrap";
import ViewModel from "../util/modal/ViewModel";
import { connect } from "react-redux";

import { addPdf_BloodResult, addPdf_PreConfirm } from "../../actions";
import store from "../../store";
import AddModal from "../util/modal/AddModal";
import { ADDPDF_BLOOD_RESULT, ADDPDF_PRE_CONFIRM } from "../../constants";

const Step1 = (props) => {
  const [viewPdf_BloodResult, setViewPdf_BloodResult] = useState(null);
  const [pdfFile_BloodResult, setPdfFile_BloodResult] = useState(null);
  const [pdfFileError_BloodResult, setPdfFileError_BloodResult] = useState("");

  const [viewPdf_PreConfirm, setViewPdf_PreConfirm] = useState(null);
  const [pdfFile_PreConfirm, setPdfFile_PreConfirm] = useState(null);
  const [pdfFileError_PreConfirm, setPdfFileError_PreConfirm] = useState("");

  const [progressPreConfirm, setProgressPreConfirm] = useState(null);

  if (props.currentStep !== 1) {
    return null;
  }

  const fileType = ["application/pdf"];

  const handlePdfFileSubmit_BloodResult = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile_BloodResult(e.target.result);
          setPdfFileError_BloodResult("");

          props.addPdf_BloodResult(e.target.result);
        };
      } else {
        setPdfFile_BloodResult(null);
        props.addPdf_BloodResult(null);
        setPdfFileError_BloodResult("Lütfen PDF dosyasını seçiniz.");
      }
    } else {
      console.log("Dosya Seç:");
    }
  };

  const handlePdfFileSubmit_PreConfirm = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile_PreConfirm(e.target.result);
          setPdfFileError_PreConfirm("");

          props.addPdf_PreConfirm(e.target.result);
        };
      } else {
        setPdfFile_PreConfirm(null);
        props.addPdf_PreConfirm(null);
        setPdfFileError_PreConfirm("Lütfen PDF dosyasını seçiniz.");
      }
    } else {
      console.log("Dosya Seç:");
    }
  };

  const handlePdfFileChange_PreConfirm = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile_PreConfirm(e.target.result);
          setPdfFileError_PreConfirm("");

          props.addPdf_Confirmation(e.target.result);
        };
      } else {
        setPdfFile_PreConfirm(null);
        props.addPdf_PreConfirm(null);
        setPdfFileError_PreConfirm("Lütfen PDF dosyası seçiniz.");
      }
    } else {
      console.log("Dosya Seç:");
    }
  };

  const handlePdfFileChange_BloodResult = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile_BloodResult(e.target.result);
          setPdfFileError_BloodResult("");

          props.addPdf_BloodResult(e.target.result);
        };
      } else {
        setPdfFile_BloodResult(null);
        props.addPdf_BloodResult(null);
        setPdfFileError_BloodResult("Lütfen PDF dosyası seçiniz.");
      }
    } else {
      console.log("Dosya Seç:");
    }
  };

  return (
    <>
      <FormGroup>
        <div className="form-group">
          <label>
            Donör Kodu:{" "}
            {props.donor[0] === undefined ? "Seçilmedi" : props.donor[0].code}
          </label>

          <Typeahead
            multiple={props.multiple}
            id="select-donor"
            onChange={(selected) => {
              props.setDonor(selected);
            }}
            labelKey="code"
            options={props.product_DonorList}
            placeholder="Donör Kodu Seç..."
            selected={props.donor}
            /*disabled={!props.isEditable || !(props.id === "_add" || props.id === null)}*/
          />
          <div
            className={props.hasError("donor") ? "inline-errormsg" : "hidden"}
          >
            Donör kodu seçmelisiniz.
          </div>
        </div>

        <div className="form-group">
          <label>
            Donör Adı:{" "}
            {props.donor[0] === undefined
              ? "Seçilmedi"
              : props.donor[0].name + " " + props.donor[0].surname}
          </label>

          <Typeahead
            multiple={props.multiple}
            id="select-donor"
            onChange={(selected) => {
              props.setDonor(selected);
            }}
            labelKey={(option) => `${option.name} ${option.surname}`}
            options={props.product_DonorList}
            placeholder="Donör Adı Seç..."
            selected={props.donor}
            /*disabled={!props.isEditable || !(props.id === "_add" || props.id === null)}*/
          />
          <div
            className={props.hasError("donor") ? "inline-errormsg" : "hidden"}
          >
            Donör adı seçmelisiniz.
          </div>
        </div>

        <div className="form-group">
          <label>Doku Tedarik Eden Doktor Bilgileri:</label>
          <input
            placeholder=""
            name="doctorName"
            className={
              props.hasError("doctorName")
                ? "form-control is-invalid"
                : "form-control"
            }
            value={props.doctorName}
            onChange={props.setDoctorName}
            disabled={!props.isEditable}
          />
          <div
            className={
              props.hasError("doctorName") ? "inline-errormsg" : "hidden"
            }
          >
            Doktor Adını girmelisiniz.
          </div>
        </div>
        <div className="form-group">
          <label>Doku Çıkarım Zamanı:</label>
          <input
            type="datetime-local"
            id="issueTissueDate"
            name="issueTissueDate"
            className={
              props.hasError("issueTissueDate")
                ? "form-control is-invalid"
                : "form-control"
            }
            value={props.issueTissueDate}
            onChange={props.changeIssueTissueDateHandler}
            disabled={!props.isEditable}
          />
          <div
            className={
              props.hasError("issueTissueDate") ? "inline-errormsg" : "hidden"
            }
          >
            Doku Çıkarım Zamanını girmelisiniz.
          </div>
        </div>

        <div className="form-group">
          <label>Merkeze Geliş Zamanı:</label>
          <input
            type="datetime-local"
            id="arrivalDate"
            name="arrivalDate"
            className={
              props.hasError("arrivalDate")
                ? "form-control is-invalid"
                : "form-control"
            }
            value={props.arrivalDate}
            onChange={props.changeArrivalDateHandler}
            disabled={!props.isEditable}
          />
          <div
            className={
              props.hasError("arrivalDate") ? "inline-errormsg" : "hidden"
            }
          >
            Merkeze Geliş Tarihini girmelisiniz.
          </div>
        </div>

        <form className="form-group">
          <label>Kan Sonuçları:</label>
          <input
            type="file"
            className="form-control"
            required
            onChange={handlePdfFileChange_BloodResult}
          />
          {pdfFileError_BloodResult && (
            <div className="error-msg">{pdfFileError_BloodResult}</div>
          )}
          <br></br>
          <button
            onClick={handlePdfFileSubmit_BloodResult}
            className="btn btn-success btn-lg"
          >
            Yükle
          </button>

          <ViewModel
            class="vlu-left-margin"
            initialModalState={false}
            component={"ViewPdfComponent"}
            callback={props.viewPdf_BloodResult}
            isEditable={props.isEditable}
            viewPdf={viewPdf_BloodResult}
            viewPdfType={ADDPDF_BLOOD_RESULT}
          />
        </form>

        <form className="form-group">
          <label>Ön Kabul Formu:</label>
          <input
            type="file"
            className="form-control"
            required
            onChange={handlePdfFileChange_PreConfirm}
          />
          {pdfFileError_PreConfirm && (
            <div className="error-msg">{pdfFileError_PreConfirm}</div>
          )}
          <br></br>
          <button
            onClick={handlePdfFileSubmit_PreConfirm}
            className="btn btn-success btn-lg"
          >
            Yükle
          </button>

          <ViewModel
            class="vlu-left-margin"
            initialModalState={false}
            component={"ViewPdfComponent"}
            callback={props.viewPdf_PreConfirm}
            isEditable={props.isEditable}
            viewPdf={viewPdf_PreConfirm}
            viewPdfType={ADDPDF_PRE_CONFIRM}
          />
        </form>

        <div className="form-group">
          <label>
            Doku Tipi:{" "}
            {props.tissueType[0] === undefined
              ? "Seçilmedi"
              : props.tissueType[0].name}{" "}
          </label>
          <div>
            <Typeahead
              multiple={props.multiple}
              id="select-tissueType"
              onChange={(selected) => {
                props.setTissueType(selected);
              }}
              labelKey="name"
              options={props.product_TissueTypeList}
              placeholder="Doku Tipini Seçiniz..."
              selected={props.tissueType}
              disabled={!props.isEditable}
            />
            <div
              className={
                props.hasError("tissueType") ? "inline-errormsg" : "hidden"
              }
            >
              Doku Tipini girmelisiniz.
            </div>
            <AddModal
              style={{ marginRight: "5px" }}
              initialModalState={false}
              component={"CreateTissueTypeComponent"}
              callback={props.addCreateTissueTypeComponent}
              isEditable={props.isEditable}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            Karantina Lokasyonu:{" "}
            {props.location[0] === undefined
              ? "Seçilmedi"
              : props.location[0].name}
          </label>
          <div>
            <Typeahead
              multiple={props.multiple}
              id="select-location"
              onChange={(selected) => {
                props.setLocation(selected);
              }}
              labelKey="name"
              options={props.product_LocationList}
              placeholder="Karantina Lokasyonunu Seç..."
              selected={props.location}
              disabled={!props.isEditable}
            />
            <div
              className={
                props.hasError("location") ? "inline-errormsg" : "hidden"
              }
            >
              Karantina Lokasyonunu girmelisiniz.
            </div>
            <AddModal
              style={{ marginRight: "5px" }}
              initialModalState={false}
              component={"CreateLocationComponent"}
              callback={props.addCreateLocationComponent}
              isEditable={props.isEditable}
            />
          </div>
        </div>
      </FormGroup>
    </>
  );
};

function mapStateToProps(state) {
  return {
    pdfFile_BloodResult: state.pdfFile_BloodResult,
  };
}

export default connect(mapStateToProps, {
  addPdf_BloodResult,
  addPdf_PreConfirm,
})(Step1);
