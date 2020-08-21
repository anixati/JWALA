import { observer } from "mobx-react";
import { useStore } from "../../stores";
import React from "react";
import { useParams } from "react-router-dom";




export const ViewEntity: React.FC = observer(() => {
    const { accStore } = useStore();
    let { id } = useParams();
    const onSearch = (e) => {
    }
    const onNew = () => {
    }
    return (
        <h1>view ing {id} </h1>
    )
})