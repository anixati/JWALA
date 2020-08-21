import { autorun } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { List } from "rsuite";
import { DataItemList, DataListItem } from "../../components";
import { useStore } from "../../stores";



export const EntityList: React.FC = observer(() => {
    const navigate = useNavigate();
    const { accStore } = useStore();
    useEffect(() => autorun(() => accStore.loadAccounts()), []);
    const onSearch = (e) => {
        accStore.loadAccounts();
    }
    const onNew = () => {
        // const account = new Account({ Name: 'Test', Description: 'description value' });
        // accStore.addAccount(account);
        navigate('/accounts/new');
    }
    return (
        <DataItemList onSearch={onSearch} onNew={onNew}>
            <List hover>
                {accStore.items.map((item, index) => (
                    <List.Item key={index} index={index}>
                        <DataListItem descVal={item.Description!} auditVal={item.lastModified} alert={item.disabled!}>
                            <Link to={`/accounts/${item.id}`}><h5>{item.Name}</h5></Link>
                        </DataListItem>
                    </List.Item>
                ))}
            </List>
        </DataItemList>)
})