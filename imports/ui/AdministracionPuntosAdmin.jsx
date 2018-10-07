import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PuntosObtenidos from './PuntosObtenidos.jsx';
import ConseguirPuntos from './ConseguirPuntos.jsx';
import BeneficiosRedimidosAdmin from './BeneficiosRedimidosAdmin.jsx';

export default class AdministracionPuntosAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verPuntos: false,
      token: localStorage.getItem('PTUusuario'),
      usuario: null,
      puntosUsuario: 0,
      nombreUsuario: '',
      correo: '',
      admin: false
    };
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'uniandino') {
          console.log('EL USUARIO VIENDO EL DETAIL ES', res);
          this.setState({
            verPuntos: true,
            usuario: res,
            puntosUsuario: res.puntos,
            nombreUsuario: res.nombre,
            correo: res.correo,
            redimidos: null
          });
        } else {
          this.setState({
            admin: true,
            nombreUsuario: res.nombre,
            usuario: res
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div id="catalogoBeneficios" className="row">
          <div className="row">
            <div className="col-12">
              <div className="bg-uniandes text-light">
                <br />
                <h1 className="text-center font-weight-bold">
                  &nbsp;Beneficios redimidos &nbsp;
                </h1>
                <br />
              </div>
              <br />
              <br />
              <center>
                <p>
                  En esta sección puedes ver la actividad de los egresados
                  mediante sus redenciones de puntos. Si desa contactar al
                  usuario de click en el correo o teléfono.
                </p>
              </center>
            </div>
            <div className="col-12">
              {' '}
              <BeneficiosRedimidosAdmin />{' '}
            </div>
          </div>
        </div>
        );
      </div>
    );
  }
}
