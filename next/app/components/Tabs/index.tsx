import React, { ReactNode, useState } from 'react';

type TabProps = {
    label: string;
    children: ReactNode;
    action?: () => unknown,
};

type TabsProps = {
    children: React.ReactElement<TabProps>[];
};

const Tab: React.FC<TabProps> = ({ children }) => {
    return <div>{children}</div>;
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="flex border-b border-gray-200">
                {children.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === index
                            ? 'border-b-2 border-gray-500 text-gray-500'
                            : 'text-gray-500'
                            }`}
                        onClick={() => {
                            setActiveTab(index)
                            tab.props.action?.()
                        }}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            <div className="py-4">
                {children.map((tab, index) => (
                    <div key={index}>
                        {activeTab === index ? tab.props.children : null}
                    </div>
                ))}
            </div>
        </>
    );
};

export { Tab, Tabs };

