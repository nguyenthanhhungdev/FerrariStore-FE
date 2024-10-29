import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import React from "react";

interface TabData {
    label: string;
    value: string;
    content: React.ReactNode;
}

interface TabsDefaultProps {
    data: TabData[];
}

const TabsDefault = ({ data }: TabsDefaultProps) => {
    return (
        <Tabs value={data[0]?.value || ""}>
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, content }) => (
                    <TabPanel key={value} value={value}>
                        {content}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
};

export default TabsDefault;

