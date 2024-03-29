import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DonorService from "../../services/DonorService";
import DonorInstituteService from "../../services/DonorInstituteService";
import AddModal from "../util/modal/AddModal";

class CreateDonorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable:
        this.props.match === undefined
          ? true
          : this.props.match.params.state === "view"
          ? false
          : true,
      options: {
        autoClose: false,
        keepAfterRouteChange: false,
      },
      code: "",
      citizenshipNumber: "",
      name: "",
      surname: "",
      telephone: "",
      address: "",
      addressCity: [],
      addressDistrict: [],
      tissueNumber: "",
      tissueType: "",
      bloodType: [],
      birthdate: "",
      sex: [],

      deleted: false,
      multiple: false,
      errors: [],

      isCreation: false,

      donorInstitute: [], // Typeahead needs array.
      product_DonorInstituteList: [],

      donor_Districts: [],
      donor_CityList: [],
      donor_DistrictList: [],
      donor_SexList: [],
      donor_BloodTypeList: [],
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.addCreateDonorInstituteComponent =
      this.addCreateDonorInstituteComponent.bind(this);
    this.saveDonor = this.saveDonor.bind(this);
    this.changeCitizenshipNumberHandler =
      this.changeCitizenshipNumberHandler.bind(this);
    this.changeCodeHandler = this.changeCodeHandler.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
    this.changeTelephoneHandler = this.changeTelephoneHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeTissueTypeHandler = this.changeTissueTypeHandler.bind(this);
    this.changeTissueNumberHandler = this.changeTissueNumberHandler.bind(this);
    this.changeBirthdateHandler = this.changeBirthdateHandler.bind(this);
    this.changeBloodTypeHandler = this.changeBloodTypeHandler.bind(this);
    this.changeSexHandler = this.changeSexHandler.bind(this);
  }

  addCreateDonorInstituteComponent() {
    window.location.reload();
  }

  changeCodeHandler = (event) => {
    this.setState({ code: event.target.value });
  };

  changeCitizenshipNumberHandler = (event) => {
    this.setState({ citizenshipNumber: event.target.value });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeSurnameHandler = (event) => {
    this.setState({ surname: event.target.value });
  };

  changeTelephoneHandler = (event) => {
    this.setState({ telephone: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  changeTissueTypeHandler = (event) => {
    this.setState({ tissueType: event.target.value });
  };

  changeTissueNumberHandler = (event) => {
    this.setState({ tissueNumber: event.target.value });
  };

  changeBirthdateHandler = (event) => {
    this.setState({ birthdate: event.target.value });
  };

  changeBloodTypeHandler = (event) => {
    this.setState({ bloodType: event.target.value });
  };

  changeSexHandler = (event) => {
    this.setState({ sex: event.target.value });
  };

  checkTelephoneNumber = (value) => {
    var isValid =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value);
    return isValid;
  };

  checkTcNumber = (value) => {
    value = value.toString();
    var isEleven = /^[0-9]{11}$/.test(value);
    var totalX = 0;
    for (var i = 0; i < 10; i++) {
      totalX += Number(value.substr(i, 1));
    }
    var isRuleX = totalX % 10 == value.substr(10, 1);
    var totalY1 = 0;
    var totalY2 = 0;
    for (var i = 0; i < 10; i += 2) {
      totalY1 += Number(value.substr(i, 1));
    }
    for (var i = 1; i < 10; i += 2) {
      totalY2 += Number(value.substr(i, 1));
    }
    var isRuleY = (totalY1 * 7 - totalY2) % 10 == value.substr(9, 0);
    return isEleven && isRuleX && isRuleY;
  };

  getDistrict = (selected) => {
    DonorService.getDistrict(selected)
      .then((res) => {
        this.setState({ donor_DistrictList: res.data });
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  componentDidMount() {
    DonorService.getCities()
      .then((res) => {
        this.setState({ donor_CityList: res.data });
      })
      .catch((ex) => {
        console.log(ex);
      });

    DonorInstituteService.getAllDonorInstitutes()
      .then((res) => {
        this.setState({ product_DonorInstituteList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });

    DonorService.getBloodTypeList()
      .then((res) => {
        this.setState({ donor_BloodTypeList: res.data });
      })
      .catch((ex) => {
        console.log(ex);
      });

    DonorService.getSexList()
      .then((res) => {
        this.setState({ donor_SexList: res.data });
      })
      .catch((ex) => {
        console.log(ex);
      });

    if (this.state.id === "_add") {
      this.setState({ isCreation: true });
      return;
    } else {
      this.setState({ isCreation: false });
      DonorService.getDonorById(this.state.id)
        .then((res) => {
          let donor = res.data;
          this.setState({
            code: donor.code,
            name: donor.name,
            surname: donor.surname,
            telephone: donor.telephone,
            citizenshipNumber: donor.citizenshipNumber,
            address: donor.address,
            addressCity: [donor.addressCity],
            donorInstitute: [donor.donorInstitute],
            addressDistrict: [donor.addressDistrict],
            tissueNumber: donor.tissueNumber,
            tissueType: donor.tissueType,
            bloodType: [donor.bloodType],
            sex: [donor.sex],
            birthdate: donor.birthdate,
          });
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
  }

  saveDonor = (event) => {
    event.preventDefault();
    var errors = [];

    /*
    if (this.state.code === "" || this.state.code.length > 8) {
      errors.push("code");
    }
    */
    if (this.state.donorInstitute[0] === undefined) {
      errors.push("donorInstitute");
    }
    if (this.state.name === "") {
      errors.push("name");
    }
    if (this.state.surname === "") {
      errors.push("surname");
    }
    if (
      this.state.citizenshipNumber === "" ||
      !this.checkTcNumber(this.state.citizenshipNumber)
    ) {
      errors.push("citizenshipNumber");
    }
    if (
      this.state.telephone === "" ||
      !this.checkTelephoneNumber(this.state.telephone)
    ) {
      errors.push("telephone");
    }
    if (this.state.address === "") {
      errors.push("address");
    }
    if (this.state.addressCity[0] === undefined) {
      errors.push("addressCity");
    }
    if (this.state.addressDistrict[0] === undefined) {
      errors.push("addressDistrict");
    }
    if (this.state.bloodType[0] === undefined) {
      errors.push("bloodType");
    }
    if (this.state.sex[0] === undefined) {
      errors.push("sex");
    }
    if (this.state.tissueType === "") {
      errors.push("tissueType");
    }
    if (this.state.tissueNumber === "") {
      errors.push("tissueNumber");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }

    var isBreak = false;

    /*
    DonorService.getDonorByCode(this.state.code)
      .then((res) => {
        let donor = res.data;
        if (donor.code === this.state.code) {
          isBreak = false;
        } else {
          const notify = () =>
            toast("Lütfen önceden kullanılmamış bir donör Id kullanınız.");
          notify();
          isBreak = true;
        }
      })
      .catch((ex) => {
        // do nothing
      });
*/
    if (!isBreak) {
      let idParam = undefined;
      if (this.state.id !== "_add") {
        idParam = this.state.id;
      }
      let donor = {
        id: idParam,
        code: this.state.code,
        citizenshipNumber: this.state.citizenshipNumber,
        name: this.state.name,
        surname: this.state.surname,
        address: this.state.address,
        addressCity: this.state.addressCity[0],
        addressDistrict: this.state.addressDistrict[0],
        donorInstitute: this.state.donorInstitute[0],
        telephone: this.state.telephone,
        sex: this.state.sex[0],
        birthdate: this.state.birthdate,
        bloodType: this.state.bloodType[0],
        tissueType: this.state.tissueType,
        tissueNumber: this.state.tissueNumber,
        deleted: this.state.deleted,
      };
      if (this.state.id === "_add") {
        // create user
        DonorService.createDonor(donor)
          .then((res) => {
            const notify = () =>
              toast("Donör başarılı bir şekilde kaydedildi.");
            notify();
            this.props.history.push("/donors");
          })
          .catch((ex) => {
            if (
              ex.response.data.message ===
              "Donor citizenship number is already taken!"
            ) {
              const notify = () =>
                toast(
                  "Bu TC Kimlik numarası ile kaydedilmiş bir donör bulunmaktadır."
                );
              notify();
            } else {
              const notify = () =>
                toast("Donör kaydedilemedi. Hata Kodu: CRT-DON-01");
              notify();
            }
          });
      } else {
        DonorService.updateDonor(this.state.id, donor)
          .then((res) => {
            const notify = () =>
              toast("Donör Kurum Listesi başarılı bir şekilde güncellendi.");
            notify();
            this.props.history.push("/donors");
          })
          .catch((ex) => {
            const notify = () =>
              toast("Donör güncellenemedi. Hata Kodu: CRT-DON-02");
            notify();
          });
      }

      // If opened as modal
      if (this.state.callbackModalYes) {
        this.state.callbackModalYes();
      }
    }
  };

  cancel = (event) => {
    // If opened as modal
    if (this.state.callbackModalNo) {
      this.state.callbackModalNo();
    } else {
      this.props.history.push("/donors");
    }
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Donör Ekle</h3>;
    } else {
      return <h3 className="text-center">Donör Güncelle</h3>;
    }
  }

  getButtonText() {
    if (this.state.id === "_add") {
      return "Kaydet";
    } else {
      return "Güncelle";
    }
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    const { multiple } = this.state;
    return (
      <div>
        <div className="container">
          <div>
            <div>
              <ToastContainer />
            </div>
          </div>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Donor Id:</label>
                    <input
                      placeholder="Donör Id Sistem tarafından üretilecektir."
                      name="code"
                      className={
                        this.hasError("code")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.code}
                      onChange={this.changeCodeHandler}
                      disabled={this.state.isCreation || !this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("code") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Donör Id girilmemiş ya da uygun uzunlukta değildir.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Donor Adı:</label>
                    <input
                      placeholder="Ali"
                      name="name"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("name") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Adı girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Donor Soyadı:</label>
                    <input
                      placeholder="Yılmaz"
                      name="surname"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.surname}
                      onChange={this.changeSurnameHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("surname") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Soyadı girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>T.C. Numarası:</label>
                    <input
                      placeholder="10203320214"
                      name="citizenshipNumber"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.citizenshipNumber}
                      onChange={this.changeCitizenshipNumberHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("citizenshipNumber")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      TC numarası uygun formatta değil veya girilmemiş.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Gönderen Kurum:{" "}
                      {this.state.donorInstitute[0] === undefined
                        ? "Seçilmedi"
                        : this.state.donorInstitute[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-donorInstitute"
                        onChange={(selected) => {
                          this.setState({ donorInstitute: selected });
                        }}
                        labelKey="name"
                        options={this.state.product_DonorInstituteList}
                        placeholder="Gönderen Kurumu Seç..."
                        selected={this.state.donorInstitute}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("donorInstitute")
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
                        callback={this.addCreateDonorInstituteComponent}
                        isEditable={this.state.isEditable}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Doku Adedi:</label>
                    <input
                      type="number"
                      placeholder="2"
                      name="tissueNumber"
                      className={
                        this.hasError("tissueNumber")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.tissueNumber}
                      onChange={this.changeTissueNumberHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("tissueNumber")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Doku adedi girilmemiş.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Doku Türü:</label>
                    <input
                      type="tel"
                      placeholder="Doku Türü"
                      name="tissueType"
                      className={
                        this.hasError("tissueType")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.tissueType}
                      onChange={this.changeTissueTypeHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("tissueType")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Doku türü girilmemiş.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Doğum Tarihi:</label>
                    <input
                      type="date"
                      placeholder=""
                      name="birthdate"
                      className={
                        this.hasError("birthdate")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.birthdate}
                      onChange={this.changeBirthdateHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("birthdate")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Doğum tarihi girilmemiş
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Kan Grubu:{" "}
                      {this.state.bloodType[0] === undefined
                        ? "Seçilmedi"
                        : this.state.bloodType[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-bloodType"
                        onChange={(selected) => {
                          this.setState({ bloodType: selected });
                        }}
                        labelKey="name"
                        options={this.state.donor_BloodTypeList}
                        placeholder="Kan Grubunu Seç..."
                        selected={this.state.bloodType}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("bloodType")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        Kan Grubunu girmelisiniz.
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Cinsiyet{" "}
                      {this.state.sex[0] === undefined
                        ? "Seçilmedi"
                        : this.state.sex[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-sex"
                        onChange={(selected) => {
                          this.setState({ sex: selected });
                        }}
                        labelKey="name"
                        options={this.state.donor_SexList}
                        placeholder="Cinsityeti Seç..."
                        selected={this.state.sex}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("sex") ? "inline-errormsg" : "hidden"
                        }
                      >
                        Cinsiyeti girmelisiniz.
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Telefon:</label>
                    <input
                      type="tel"
                      placeholder="05321234567"
                      name="telephone"
                      className={
                        this.hasError("telephone")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.telephone}
                      onChange={this.changeTelephoneHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("telephone")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Telefon formatta değil veya girilmemiş.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Adres:</label>
                    <input
                      placeholder="Adres"
                      name="address"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("address") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Adres girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Şehir Seçiniz:{" "}
                      {this.state.addressCity[0] === undefined
                        ? "Seçilmedi"
                        : this.state.addressCity[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-addressCity"
                        onChange={(selected) => {
                          this.getDistrict(selected);
                          this.setState({ addressCity: selected });
                        }}
                        labelKey="name"
                        options={this.state.donor_CityList}
                        placeholder="Şehir Seçininz..."
                        selected={this.state.addressCity}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("addressCity")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        Şehir seçmelisiniz.
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      İlçe{" "}
                      {this.state.addressDistrict[0] === undefined
                        ? "Seçilmedi"
                        : this.state.addressDistrict[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-addressDistrict"
                        onChange={(selected) => {
                          this.setState({ addressDistrict: selected });
                        }}
                        labelKey="name"
                        options={this.state.donor_DistrictList}
                        placeholder="İlçe Seçiniz..."
                        selected={this.state.addressDistrict}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("addressDistrict")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        İlçe girmelisiniz.
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveDonor.bind(this)}
                    disabled={!this.state.isEditable}
                  >
                    {this.getButtonText()}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Vazgeç
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDonorComponent;
