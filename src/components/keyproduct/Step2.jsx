import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <FormGroup>
          <div className="form-group">
            <label>
              Durumu:{" "}
              {props.statusName[0] === undefined
                ? "Seçilmedi..."
                : props.statusName[0]}
            </label>
            <Typeahead
              multiple={props.multiple}
              id="select-status"
              onChange={(selected) => {
                props.setStatus(selected);
              }}
              options={props.product_StatusNameList}
              placeholder="Durumu Seç..."
              selected={props.statusName}
              disabled={!props.isEditable}
            />
          <div
              className={
                props.hasError("status")
                  ? "inline-errormsg"
                  : "hidden"
              }
            >
              Durumu girmelisiniz.
            </div>
            <div
              className={
                props.hasError("statusNotCompatible")
                  ? "inline-errormsg"
                  : "hidden"
              }
            >
              Durum yalnızca Kabul olabilir.
            </div>
          </div>

          
          <div className="form-group">
            <label>Merkeze Geliş Zamanı (Tarih ve Saat):</label>
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
            <label>Ek Bilgi:</label>
            <input
              placeholder="Ek Bilgi"
              name="information"
              className="form-control"
              value={props.information}
              onChange={props.changeInformationHandler}
              disabled={!props.isEditable}
            />
          </div>


      </FormGroup>
    </>
  );
};

export default Step2;
