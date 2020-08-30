import React from "react";
import { ViewLayout } from "../../layouts/viewLayout";
import { useLocalStore, useObserver } from "mobx-react";
import { KoInitLoader } from "../../packages/koreui";


export const SchemaPage: React.FC = () => {


    const schemas = useLocalStore(
        () => ({
            title: 'Click to toggle',
            done: false,
            toggle() {
                schemas.done = !schemas.done
            },
            get emoji() {
                return schemas.done ? '😜' : '🏃'
            },
        })
    );



    return useObserver(() => (
        <ViewLayout title="Schema List" desc="Model content" loading={false}>
            <h3 onClick={schemas.toggle}>
                {schemas.title} {schemas.emoji}



            </h3>
            <div>
                <KoInitLoader/>
            </div>
        </ViewLayout>
    ));
};