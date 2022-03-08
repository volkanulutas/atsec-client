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
              Donör Kodu:{" "}
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
                placeholder="Donör Kodu Seç..."
                selected={props.donor}
                /*disabled={!props.isEditable || !(props.id === "_add" || props.id === null)}*/
              />
        <div
          className={
            props.hasError("donor")
              ? "inline-errormsg"
              : "hidden"
          }
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

           
                labelKey={option => `${option.name} ${option.surname}`}
                options={props.product_DonorList}
                placeholder="Donör Adı Seç..."
                selected={props.donor}
                /*disabled={!props.isEditable || !(props.id === "_add" || props.id === null)}*/
              />
        <div
          className={
            props.hasError("donor")
              ? "inline-errormsg"
              : "hidden"
          }
        >
          Donör adı seçmelisiniz.
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
          value={props.doctorName} onChange={props.setDoctorName}
          disabled={!props.isEditable} />
          <div className={props.hasError("doctorName") ? "inline-errormsg" : "hidden"}>
           Doktor Adını girmelisiniz.
      </div>
      </div>
      <div className="form-group">
            <label>Doku Çıkarım Zamanı:</label>
            <input
              type="date"
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
            <label>Merkeze Geliş Zamanı:</label>
            <input
              type="date"
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
                props.hasError("arrivalDate")
                  ? "inline-errormsg"
                  : "hidden"
              }
            >
              Merkeze Geliş Tarihini girmelisiniz.
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
