import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ProfileModal } from "./profile";
import { SettingsModal } from "./settings";
import { AboutModal } from "./about";
import { mdlContext } from "../../core";
import { createPortal } from "react-dom";


//------ Modal route Portal  -----------------

export const ModalPortal = ({ children }) => {
    const mount = document.getElementById("modal-root");
    const el = document.createElement("div");
    useEffect(() => {
        mount!.appendChild(el);
        return () => {
            mount!.removeChild(el);
        }
    }, [el, mount]);
    return createPortal(children, el)
};




//---------Modal Route ------------------------
export const ModalRoot: React.FC = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    let { id } = useParams();
    const onClose = () => {
        console.log('going back');
        setShow(false);
        navigate(-1);
    }
    const modal = () => {
        switch (id) {
            case "profile": return <ProfileModal />;
            case "settings": return <SettingsModal />;
            case "about": return <AboutModal />;
            default: return <p>.</p>;
        }
    }
    if (modal === null) {
        navigate(-1);
    }
    return (
        <mdlContext.Provider value={{ show, onClose }}>
            <div>
                {modal()}
            </div>
        </mdlContext.Provider>
    );

}


