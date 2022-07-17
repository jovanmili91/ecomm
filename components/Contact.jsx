import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Router from "next/router";

import { useStateContext } from "../context/StateContext";

const Contact = () => {
  const form = useRef();
  const { cartItems, totalPrice } = useStateContext();

  const sendEmail = (e) => {
    e.preventDefault();

    Router.push("/success");

    emailjs
      .sendForm(
        "service_3lg9jh9",
        "template_nq6krxl",
        form.current,
        "02r_Mn6Y3B_L6uV6D"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail}>
        <div className="background">
          <div className="container">
            <div className="screen">
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>VAŠA : </span>
                    <span>NAJ PRODAVNICA</span>
                  </div>
                  <div className="app-contact">Pozovite : +381 62 277 686</div>
                </div>
                <div className="screen-body-item">
                  <div className="app-form">
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="Ime i Prezime"
                        type="text"
                        name="user_name"
                      />
                    </div>
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="Vaš Email"
                        type="email"
                        name="user_email"
                      />
                    </div>
                    <div className="app-form-group">
                      <input
                        name="telefon"
                        type="text"
                        className="app-form-control"
                        placeholder="Broj Telefona"
                      />
                    </div>
                    <div className="app-form-group">
                      <input
                        name="adresa"
                        type="text"
                        className="app-form-control"
                        placeholder="Adresa za dostavu"
                      />
                    </div>
                    <div className="app-form-group">
                      <input
                        type="text"
                        className="app-form-control"
                        placeholder="Grad/Mesto"
                        name="grad"
                      />
                    </div>
                    <div className="app-form-group message">
                      <label>Vaša korpa</label>
                      <textarea
                        className="app-form-control-text"
                        name="message"
                        value={cartItems.map(
                          (item) => `\n${item.name} - Količina ${item.quantity}`
                        )}
                      />
                    </div>
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        value={`UKUPNO ${totalPrice} RSD`}
                        name="cena"
                      />
                    </div>
                    <div className="app-form-group buttons">
                      <button className="app-form-button" type="submit ">
                        PORUČI
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Contact;
