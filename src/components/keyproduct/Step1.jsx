import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup, Label, Input } from "reactstrap";

import AddModal from "../util/modal/AddModal";


const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <FormGroup>
        <div className="form-group">
            <label>
              Donör:{" "}
              {props.donor[0] === undefined
                ? "Seçilmedi"
                : props.donor[0].code}
            </label>
   
            <Typeahead
                multiple={props.multiple}
                id="select-donor"
                onChange={(selected) => {
                  props.setDonor(selected);
                }}

                labelKey="code"
                options={props.product_DonorList}
                placeholder="Donör Seç..."
                selected={props.donor}
                disabled={!props.isEditable || !(props.id === "_add" || props.id === null)}
              />
        <div
          className={
            props.hasError("donor")
              ? "inline-errormsg"
              : "hidden"
          }
        >
          Donör seçmelisiniz.
        </div>
      </div>


      <div >
      <label>
        Gönderen Kurum:{" "}
        {props.donorInstitute[0] === undefined
          ? "Seçilmedi"
          : props.donorInstitute[0].name}
      </label>
      <div>
        <Typeahead
          multiple={props.multiple}
          id="select-donorInstitute"
          onChange={(selected) => {
            props.setDonorInstitute(selected);
          }}
          labelKey="name"
          options={props.product_DonorInstituteList}
          placeholder="Gönderen Kurumu Seç..."
          selected={props.donorInstitute}
          disabled={!props.isEditable}
        />
        <div
          className={
            props.hasError("donorInstitute")
              ? "inline-errormsg"
              : "hidden"
          }
        >
          Gönderen Kurumu girmelisiniz.
        </div>
        <AddModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          component={"CreateDonorInstituteComponent"}
          callback={props.addCreateDonorInstituteComponent}
          isEditable ={props.isEditable}
        />
      </div>
    </div>

    <div className="form-group">
        <label>Doku Tedarik Eden Doktor Bilgileri:</label>
         <input placeholder="" name="doctorName" 
          className={props.hasError("doctorName") 
          ? "form-control is-invalid" 
          : "form-control"}
          value={props.doctorName} onChange={props.changeDoctorNameHandler}
          disabled={!props.isEditable} />
          <div className={props.hasError("doctorName") ? "inline-errormsg" : "hidden"}>
           Doktor Adını girmelisiniz.
      </div>
      </div>

      <div className="form-group">
        <label>Karantina Koşulları</label>
         <input placeholder="" name="quarantinaType" 
          className={props.hasError("quarantinaType") 
          ? "form-control is-invalid" 
          : "form-control"}
          value={props.quarantinaType} onChange={props.changeQuarantinaTypeHandler}
          disabled={!props.isEditable} />
          <div className={props.hasError("quarantinaType") ? "inline-errormsg" : "hidden"}>
           Karantina Koşullarını Girmelisiniz.
      </div>
      </div>

      <div className="form-group">
        <label>Doku Alma Şekli</label>
         <input placeholder="" name="tissueTakenType" 
          className={props.hasError("tissueTakenType") 
          ? "form-control is-invalid" 
          : "form-control"}
          value={props.tissueTakenType} onChange={props.changeTissueTakenTypeHandler}
          disabled={!props.isEditable} />
          <div className={props.hasError("tissueTakenType") ? "inline-errormsg" : "hidden"}>
           Doku Alma Şeklini Girmelisiniz.
      </div>
      </div>


      <div className="form-group">
            <label>Doku Çıkarım Zamanı (Saat ve Tarih):</label>
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
                props.hasError("issueTissueDate")
                  ? "inline-errormsg"
                  : "hidden"
              }
            >
              Doku Çıkarım Zamanını girmelisiniz.
            </div>
          </div>


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
                  props.hasError("tissueType")
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Doku Tipini girmelisiniz.
              </div>
              <AddModal
                style={{ marginRight: "5px" }}
                initialModalState={false}
                component={"CreateTissueTypeComponent"}
                callback={props.addCreateTissueTypeComponent}
                isEditable ={props.isEditable}
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
                  props.hasError("location")
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Karantina Lokasyonunu girmelisiniz.
              </div>
              <AddModal
                style={{ marginRight: "5px" }}
                initialModalState={false}
                component={"CreateLocationComponent"}
                callback={props.addCreateLocationComponent}
                isEditable = {props.isEditable}
              />
            </div>
          </div>


       



      </FormGroup>
      
    </>
  );
};

export default Step1;
