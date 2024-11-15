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
            <TabsHeader  placeholder={undefined}
                         onPointerEnterCapture={undefined}
                         onPointerLeaveCapture={undefined}
            >
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}
                         placeholder={undefined}
                         onPointerEnterCapture={undefined}
                         onPointerLeaveCapture={undefined}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody  placeholder={undefined}
                       onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined}
            >
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

