import React, {useState, useEffect, useRef, useContext} from 'react';
import ModalDialog from "./ModalDialog";
import useInput from "./Hooks/useInput";
import usePutData from "./Hooks/usePutData";
import AuthenticatedUserContext from "./Context/AuthenticatedUserContext";
import EditIcon from "../image/EditIcon.svg"
import Config from "../config"
import NotificationContext from "./Context/NotificationContext";
import UserContext from "./Context/UserContext";

const userApi = Config.ApiEndpoints.User;

function UserTextEditButton({name, value}) {
    const {labelText, editButtonClasses, inputRegex, inputLength, modelPropertyName, inputClasses} =
        parseProperties(name);

    const [displayEditModal, setDisplayEditModal] = useState(false);
    const [previousValue, setPreviousValue] = useState(null);
    const [previousValueConfirmedFlag, setPreviousValueConfirmedFlag] = useState(null);

    const authenticatedUser = useContext(AuthenticatedUserContext);
    const displayNotification = useContext(NotificationContext);
    const {user, setUser} = useContext(UserContext);


    const inputTag = useRef(null);

    const {text, handleTextChange} = useInput(inputRegex, inputLength, !displayEditModal);
    const {data, responseStatus, put} = usePutData(userApi + authenticatedUser.sub);

    useEffect(() => {
        if (!responseStatus) return;
        if (responseStatus === 200) {

            displayNotification(`${labelText} با موفقیت تغییر کرد.`, 5, "success");
        }
        // Something went wrong, Revert changes.
        else {
            const downGraded = {
                ...user,
                [modelPropertyName]: previousValue,
                [modelPropertyName + "Confirmed"]: previousValueConfirmedFlag
            };
            setUser(downGraded);

            if (responseStatus === 403)
                displayNotification(`${labelText} وارد شده تکراری است.`, 5, "warning");
            else
                displayNotification(`مشکلی در تغییر ${labelText} پیش آمده است. لطفا دوباره تلاش کنید.`, 5, "warning");
        }
    }, [data, responseStatus]); // On put response received

    const handleEditButton = () => setDisplayEditModal(true);
    const handleSaveButton = () => {
        // If entered value and previous value are same dont do anything
        if (inputTag.current && inputTag.current.value === value) return;

        const textEntered = inputTag.current.value;

        if(!validationNewValue(name,textEntered,displayNotification)) return;

        // Store previous value and its flag
        setPreviousValue(user[modelPropertyName]);
        setPreviousValueConfirmedFlag(user[modelPropertyName + "Confirmed"]);

        // Update UI
        const updatedUser = {
            ...user,
            [modelPropertyName]: inputTag.current.value,
            [modelPropertyName + "Confirmed"]: false
        };
        setUser(updatedUser);

        // Create model object and sent it to API
        const userToUpdate = {
            [modelPropertyName]: textEntered,
        };
        put(userToUpdate);

        // Close the edit modal
        setDisplayEditModal(false);
    };

    return (<>
            <div className={editButtonClasses}>
                <button onClick={handleEditButton}><img src={EditIcon} alt="Edit icon"/></button>
            </div>
            <ModalDialog visible={displayEditModal} setVisibility={setDisplayEditModal}>
                {displayEditModal && <div className="user-text-edit-form">
                    <input ref={inputTag} type="text" name={name} id={name} value={text}
                           onChange={handleTextChange} required/>
                    <label htmlFor={name} className={inputClasses}>{labelText}</label>
                    <div className="bar">{}</div>
                    <div className="register">
                        <button onClick={handleSaveButton}>ثبت</button>
                    </div>
                </div>}
            </ModalDialog>
        </>
    );
}

export default UserTextEditButton;

const parseProperties = name => {
    let editButtonClasses = "user-text-edit", inputLength = 0, inputClasses = null, labelText, inputRegex,
        modelPropertyName;

    switch (name) {
        case "name":
            labelText = "نام و نام خانوادگی";
            editButtonClasses = "user-text-edit name";
            inputRegex = "PerLetter";
            inputLength = 30;
            modelPropertyName = "nameAndFamily";
            break;
        case "phone":
            labelText = "شماره تماس";
            inputClasses = "ltr";
            inputRegex = "Number";
            inputLength = 11;
            modelPropertyName = "phoneNumber";
            break;
        case "StudentNumber":
            labelText = "شماره دانشجویی";
            inputClasses = "ltr";
            inputRegex = "Number";
            inputLength = 10;
            modelPropertyName = "studentNumber";
            break;
        case "Email":
            labelText = "ایمیل";
            inputClasses = "ltr";
            inputRegex = "Email";
            inputLength = 30;
            modelPropertyName = "email";
            break;
        default :
            throw "Invalid name property."
    }
    return {labelText, editButtonClasses, inputRegex, inputLength, modelPropertyName, inputClasses};
};
const validationNewValue = (name,textEntered,displayNotification) => {
    let emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
    let phoneValidationRegex = /^09[0-9]{9}/g;
    
    switch (name) {
        case "name":
            if (textEntered.length === 0) {
                displayNotification("نام و نام خانوادگی وارد شده درست نیست.", 5, "warning");
                return false;
            }
            break;

        case "phone":
            if (textEntered.match(phoneValidationRegex)[0] !== textEntered) {
                displayNotification("شماره تلفن وارد شده درست نیست.", 5, "warning");
                return false;
            }
            break;
        case "StudentNumber":
            if (textEntered.length !== 10) {
                displayNotification("شماره دانشجویی وارد شده درست نیست.", 5, "warning");
                return false;
            }
            break;
        case "Email":
            if (textEntered.match(emailValidationRegex)[0] !== textEntered) {
                displayNotification("ایمیل وارد شده درست نیست.", 5, "warning");
                return false;
            }
            break;
    }
    
    return true;
};