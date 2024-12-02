<template>
  <div class="background">
    <div class="container">
      <h2 class="sub-header font-bold">Mit BundID anmelden oder registrieren</h2>
      <p class="description">
        Melden Sie sich mit Ihrem elektronischen Personalausweis über BundID an, um weiter Digitale Wahlplattform zu nutzen.
      </p>
      <div class="login-box">
        <img src="../assets/bundIdlogo.png" alt="BundId Logo" class="logo" />
        <button @click="login" class="login-button">Login with BundId</button>
      </div>
      <div v-if="showModal" class="modal">
        <p>You will be redirected to BundId.de to continue the authentication process.</p>
        <button @click="confirmLogin">Continue</button>
        <button @click="cancelLogin">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style>
.background {
  display: flex;
  justify-content: center;
}

 /*delete
 Buttons in main.css definieren wie in aktueller Wahl für Kasten
 */
.container {
  width: 900px;
  height: 600px;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
}

.sub-header {
  text-align: center;
  margin-bottom: 20px;
  font-size: x-large;
  margin-left: 5%;
}

.description {
  margin-bottom: 20px;
  text-align: left;
  margin-left: 5%;
}

/*Design klauen vo BundID*/
.login-box {
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  background: white;
  border-radius: 10px;
  margin-top: 10%;
  width: 50%;
  justify-self: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  justify-self: center;
}


.login-button {
  background-color: #091540;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1024px) {

}
</style>
// TODO: in stores anlegen und Logik daraus nutzen
<script>
import { useAuth } from '../scripts/useAuth';

export default {
  setup() {
    const { user, isAuthenticated, showModal, login, confirmLogin, cancelLogin } = useAuth();

    return {
      user,
      isAuthenticated,
      showModal,
      login,
      confirmLogin,
      cancelLogin,
    };
  },
};
</script>
