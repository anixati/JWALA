import { observer, useLocalStore } from "mobx-react";
import React from "react";
import { ButtonToolbar, Icon, IconButton, Input, InputGroup, Tooltip, Whisper } from "rsuite";

export interface SearchBarProps {
    onSearch(inpStr: string): void;
    onNew(): void;
    placeHolder?: string
}
export const SearchBar: React.FC<SearchBarProps> = observer((rx) => {

    const store = useLocalStore(() => ({
        inputStr: '',
        get canSearch() {
            return (store.inputStr === '') ? false : true;
        },
        setval: (s: string) => {
            store.inputStr = s;
        },
        clear: () => {
            store.setval('');
            store.search();
        },
        search: () => {
            rx.onSearch(store.inputStr);
        }
    }))
    const onInpChange = (v, e) => {
        store.setval(v);
    }
    const onRefresh = (e) => {
        store.search();
    }
    return (
            <ButtonToolbar>
                <InputGroup>
                    <Input onChange={onInpChange} placeholder={rx.placeHolder ? rx.placeHolder : "Search..."} size="sm" />
                    <InputGroup.Button disabled={!store.canSearch} onClick={store.search} size="sm">
                        <Icon icon="search" />
                    </InputGroup.Button>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Refresh</Tooltip>}>
                    <IconButton icon={<Icon icon="refresh" />} size="sm" onClick={onRefresh} />
                    </Whisper>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Create New</Tooltip>}>
                    <IconButton icon={<Icon icon="plus" />} size="sm" onClick={rx.onNew} />
                    </Whisper>                    
                </InputGroup>
            </ButtonToolbar>
    );
});