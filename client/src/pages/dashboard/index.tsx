

import Menu from "../../component/dashboard/containerLeft/menu";
import Content from "../../component/dashboard/containerRight/content";
import "./dashboard.css"


import Agenda from "../../component/dashboard/containerRight/agenda";
import { useState } from "react";


export default function Dashboard() {
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(<Agenda />)
    const [selectedTitle, setSelectedTitle] = useState<string>('Agenda'); // Título inicial


    const handleComponentChange = (component: JSX.Element, title: string) => {
        setSelectedComponent(component);
        setSelectedTitle(title);

    }

    return (
        <div className="container-dashboard">
            <Menu handleComponentChange={handleComponentChange} />
            <Content selectedComponent={selectedComponent} title={selectedTitle} />
        </div>
    );
}