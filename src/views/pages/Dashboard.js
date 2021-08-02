import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col } from 'reactstrap';

class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    return (
      <div>
        <Row>
          <Col md={6}>
            <div className="home-hero" style={heroStyles}>
              <h1>SEC Yönetim Sistemi</h1>
              <p className="text-muted">
             
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={reactFeature}
                  style={{ width: 70, height: 70 }}
                  alt="react.js"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Kullanıcı&Rol Yönetimi</h2>
                  <p className="text-muted">
                    Kullanıcı, rol ve yetki yönetimi sağlanır. Yetkisi olmayan kullanıcının kritik bilgilere erişimi engellenir.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={bootstrapFeature}
                  style={{ width: 70, height: 70 }}
                  alt="Bootstrap"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Üretim Yönetimi</h2>
                  <p className="text-muted">
                    Ürünün süreçlerinin baştan uca yönetimi, müşteri ve donor ile ilişkilendirilmesi, muhabase yazılımlarıyla entegrasyon.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={sassFeature}
                  style={{ width: 70, height: 70 }}
                  alt="Sass"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">SEC Kodu Üretimi</h2>
                  <p className="text-muted">
                    Uluslarası standartlara uygun SEC kodu üretimi.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={responsiveFeature}
                  style={{ width: 70, height: 70 }}
                  alt="Responsive"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Her Cihaza Uygun Tasarım</h2>
                  <p className="text-muted">
                    Tablet, bilgisayar ve telefondan aynı şekilde erişim.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
