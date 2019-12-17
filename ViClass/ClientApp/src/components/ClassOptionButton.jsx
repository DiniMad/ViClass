import React, {useState, useEffect, useContext} from "react";
import ModalDialog from "./ModalDialog";
import usePutData from "./Hooks/usePutData";
import NotificationContext from "./Context/NotificationContext";
import RemoveIcon from "../image/RemoveIcon.svg";
import PlusIcon from "../image/PlusIcon.svg";
import Config from "../config";

const none = 0,
    student = 1,
    instructor = 2;
const classApi = Config.ApiEndpoints.Class;

function ClassOptionButton({classId, relationWithUser, studentsNumber, setDataDependency, replaceURL, maxNumber}) {

    const {
        title,
        className,
        imageSource,
        imageAltText,
        submitText,
        confirmationText,
        successMessage,
        errorMessage
    } = getProperties(relationWithUser); // Get dynamic properties based on user relation with class

    const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);

    const displayNotification = useContext(NotificationContext);

    const [data, status, put] = usePutData(classApi + classId);

    useEffect(() => {
        if (!data) return;

        if (status === 200) {
            displayNotification(successMessage, 5, "success");
            if (relationWithUser === instructor)
                replaceURL("/dashboard");   // Redirect to dashboard on class deleted
            else
                setDataDependency(data);    // Just change the dependency so class details re-fetch
        }
        else {
            displayNotification(errorMessage, 5, "warning")
        }
    }, [data, status]); // Update UI and display notification after http put responded

    const handleOptionButton = () => setConfirmationModalDisplay(true);
    const handleCancelButton = () => setConfirmationModalDisplay(false);
    const handleSubmit = async e => {
        e.preventDefault();
        const register = 0, unregister = 1, remove = 2;

        switch (relationWithUser) {
            case none:
                if (maxNumber !== null && studentsNumber >= maxNumber) {
                    displayNotification("ظرفیت کلاس پر شده است.", 5);
                    return;
                }
                put({action: register});
                break;

            case student:
                put({action: unregister});
                break;

            case instructor:
                if (studentsNumber !== 0) {
                    displayNotification("حذف کلاسی که دانشجو دارد امکان پذیر نیست.", 5);
                    return;
                }
                put({action: remove});
                break;
            default:
                throw "relationWithUser property is not valid.";
        }
        setConfirmationModalDisplay(false);
    };

    return (
        <>
            <button className="class-option-button" onClick={handleOptionButton}>
                <div className={"class-option-button-content " + className}>
                    <img title={title} src={imageSource} alt={imageAltText}/>
                </div>
            </button>
            <ModalDialog visible={confirmationModalDisplay} setVisibility={setConfirmationModalDisplay}>
                <form className="class-confirmation-modal" onSubmit={handleSubmit}>
                    <p>{confirmationText}</p>
                    <div className="class-confirmation-modal-buttons">
                        <input type="submit" value={submitText}/>
                        <input type="button" value="بیخیال" onClick={handleCancelButton}/>
                    </div>
                </form>
            </ModalDialog>
        </>
    );
}

export default ClassOptionButton;
const getProperties = relationWithUser => {
    const className = relationWithUser === none
                      ? "sub"
                      : relationWithUser === student
                        ? "unsub"
                        : "remove";

    const imageSource = relationWithUser === instructor
                        ? RemoveIcon
                        : PlusIcon;

    const imageAltText = relationWithUser === none
                         ? "Subscribe"
                         : relationWithUser === student
                           ? "Unsubscribe"
                           : "Remove";

    const title = relationWithUser === none
                  ? "Subscribe"
                  : relationWithUser === student
                    ? "Unsubscribe"
                    : "Remove";

    const submitText = relationWithUser === none
                       ? "ثبت نام"
                       : relationWithUser === student
                         ? "لغو ثبت نام"
                         : "حذف";

    const confirmationText = relationWithUser === none
                             ? "می خواهید در کلاس ثبت نام کنید؟"
                             : relationWithUser === student
                               ? "می خواهید ثبت نام خود را لغو کنید؟"
                               : "می خواهید کلاس را حذف کنید؟";

    const successMessage = relationWithUser === none
                           ? "ثبت نام در کلاس موفقیت آمیز بود."
                           : relationWithUser === student
                             ? "نام شما با موفقیت از کلاس حذف شد."
                             : "کلاس با موفقیت حذف شد.";

    const errorMessage = relationWithUser === none
                         ? "مشکلی در حین ثبت نام بوجود رخ داد."
                         : relationWithUser === student
                           ? "مشکلی در حین حذف نام شما رخ داده است."
                           : "مشکلی در حین حذف کلاس بوجود آمده است.";

    return {title, className, imageSource, imageAltText, submitText, confirmationText, successMessage, errorMessage};
};