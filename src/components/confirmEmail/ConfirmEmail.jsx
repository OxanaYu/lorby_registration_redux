import React, { useRef, useState } from "react";
import styles from "./confirmEmail.module.css";
import illustration from "../assets/illustration.png";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { checkUserEmail } from "../../store/actions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import WrongCodeError from "../error-handle/WrongCodeError";

const ConfirmEmail = () => {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [placeholder, setPlaceholder] = useState(["__", "", "", ""]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value !== "" && index < 3) {
      const newPlaceholder = [...placeholder];
      newPlaceholder[index + 1] = "__";
      setPlaceholder(newPlaceholder);
    }
  };

  const code = inputValues.join("");
  console.log(code);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(checkUserEmail(code));

    setInputValues(["", "", "", ""]);
  };

  const handleKeyUp = (nextFieldRef, e) => {
    const { value } = e.target;
    if (value.length === 1) {
      nextFieldRef.current.focus();
    }
  };

  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.image}>
          <div className={styles.image__top}>
            <img src={illustration} alt="" />
          </div>
          <div className={styles.image__bottom}>
            <p className={styles.image__lorby}>Lorby</p>
            <p className={styles.image__text}>Твой личный репетитор</p>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.form__main_title}>
            <p className={styles.form__main_text}>
              Введи 4-значный код, <br /> высланный на <br /> почту
            </p>
          </div>
          <Formik
            initialValues={{ code1: "", code2: "", code3: "", code4: "" }}
            validationSchema={Yup.object().shape({
              code1: Yup.string().required(""),
              code2: Yup.string().required(""),
              code3: Yup.string().required(""),
              code4: Yup.string().required(""),
            })}
          >
            {({ isSubmitting, isValid }) => (
              <Form className={styles.form__registraition}>
                <div className={styles.codeInputContainer}>
                  <Field
                    className={`${styles.form__input} ${
                      !isValid ? styles.error : ""
                    }`}
                    type="text"
                    name="code1"
                    maxLength={1}
                    placeholder={placeholder[0]}
                    onKeyUp={(e) => handleKeyUp(code2Ref, e)}
                    value={inputValues[0]}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                  />
                  <Field
                    className={`${styles.form__input} ${
                      !isValid ? styles.error : ""
                    }`}
                    type="text"
                    name="code2"
                    maxLength={1}
                    placeholder={placeholder[1]}
                    innerRef={code2Ref}
                    onKeyUp={(e) => handleKeyUp(code3Ref, e)}
                    value={inputValues[1]}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                  />
                  <Field
                    className={`${styles.form__input} ${
                      !isValid ? styles.error : ""
                    }`}
                    type="text"
                    name="code3"
                    maxLength={1}
                    placeholder={placeholder[2]}
                    innerRef={code3Ref}
                    onKeyUp={(e) => handleKeyUp(code4Ref, e)}
                    value={inputValues[2]}
                    onChange={(e) => handleInputChange(2, e.target.value)}
                  />
                  <Field
                    className={`${styles.form__input} ${
                      !isValid ? styles.error : ""
                    }`}
                    type="text"
                    name="code4"
                    maxLength={1}
                    placeholder={placeholder[3]}
                    innerRef={code4Ref}
                    value={inputValues[3]}
                    onChange={(e) => handleInputChange(3, e.target.value)}
                  />
                </div>
                <WrongCodeError />
                <button
                  type="submit"
                  // disabled={isSubmitting || !isValid}
                  className={styles.form__button}
                  onClick={handleSubmit}
                >
                  Подтвердить
                </button>
              </Form>
            )}
          </Formik>
          <NavLink className={styles.form__bottom_text}>
            <p>Выслать код повторно</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
