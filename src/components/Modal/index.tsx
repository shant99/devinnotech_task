import { resetErrorRedux } from "../../store/features/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./modal.module.css";

const Modal = () => {
    const dispatch = useAppDispatch();
    const { fetchDataError } = useAppSelector((state) => state.weather);

    const closeModal = () => dispatch(resetErrorRedux());

    if (!fetchDataError) return <></>;

    return (
        <div className={styles.modal_wrapper} onClick={closeModal}>
            <div className={styles.modal_main}>
                <p>Sorry. Couldn't find a city you wrote</p>
            </div>
        </div>
    );
};

export default Modal;
