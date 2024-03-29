import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const Step2 = (props) => {
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
            className={props.hasError("status") ? "inline-errormsg" : "hidden"}
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

        <div>
          <Label style={{ marginLeft: "20px" }}>
            <Input
              type="checkbox"
              checked={props.tissueCarryCase}
              onChange={props.handleTissueCarryCase}
              disabled={!props.isEditable}
            ></Input>
            Doku Taşıma Çantası
          </Label>
          <div
            className={
              props.hasError("arrivalDate") ? "inline-errormsg" : "hidden"
            }
          >
            Doku Taşıma Çantası seçilmelidir.
          </div>
        </div>

        <div>
          <Label style={{ marginLeft: "20px" }}>
            <Input
              type="checkbox"
              checked={props.sterialBag}
              onChange={props.handleSterialBag}
              disabled={!props.isEditable}
            ></Input>
            Steril Poşet
          </Label>
          <div
            className={
              props.hasError("arrivalDate") ? "inline-errormsg" : "hidden"
            }
          >
            Steril Poşet seçilmelidir.
          </div>
        </div>
        <div>
          <Label style={{ marginLeft: "20px" }}>
            <Input
              type="checkbox"
              checked={props.dataLogger}
              onChange={props.handleDataLogger}
              disabled={!props.isEditable}
            ></Input>
            Data Logger
          </Label>
          <div
            className={
              props.hasError("dataLogger") ? "inline-errormsg" : "hidden"
            }
          >
            Data Logger seçilmelidir.
          </div>
        </div>

        <div>
          <div className="form-group">
            <label>Sıcaklık Aralığı</label>
            <input
              placeholder="Sıcaklık Aralığı"
              name="information"
              className="form-control"
              value={props.temperature}
              onChange={props.changeTemperatureHandler}
              disabled={!props.isEditable}
            />
            <div
              className={
                props.hasError("arrivalDate") ? "inline-errormsg" : "hidden"
              }
            >
              Sıcaklık Aralığı belirtilmelidir.
            </div>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step2;
