import AuthModal from "../components/modals/auth_modal";
import RegisterModal from "../components/modals/register_modal";
import PasswordModal from "../components/modals/password_modal";

export default function Modal(props) {
  const current = props.modal;
  const theme = props.theme;

  const setModal = (modal) => {
    props.childSetModal(modal);
  };

  if (current == "login")
    return <AuthModal theme={theme} childSetModal={setModal}></AuthModal>;
  else if (current == "register")
    return (
      <RegisterModal theme={theme} childSetModal={setModal}></RegisterModal>
    );
  else if (current == "password")
    return (
      <PasswordModal theme={theme} childSetModal={setModal}></PasswordModal>
    );
  else return <></>;
}
