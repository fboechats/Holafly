import { fireEvent, render } from '@testing-library/react';
import { Tab, Tabs } from './index';

describe('Tabs component', () => {
    it('renders tabs with correct labels', () => {
        const { getByText } = render(
            <Tabs>
                <Tab label="Tab 1">Content 1</Tab>
                <Tab label="Tab 2">Content 2</Tab>
            </Tabs>
        );

        expect(getByText('Tab 1')).toBeInTheDocument();
        expect(getByText('Tab 2')).toBeInTheDocument();
    });

    it('displays tab content when tab is clicked', () => {
        const { getByText, queryByText } = render(
            <Tabs>
                <Tab label="Tab 1">Content 1</Tab>
                <Tab label="Tab 2">Content 2</Tab>
            </Tabs>
        );

        const tab1 = getByText('Tab 1');
        const tab2 = getByText('Tab 2');

        expect(getByText('Content 1')).toBeInTheDocument();
        expect(queryByText('Content 2')).not.toBeInTheDocument();

        fireEvent.click(tab2);

        expect(queryByText('Content 1')).not.toBeInTheDocument();
        expect(getByText('Content 2')).toBeInTheDocument();

        fireEvent.click(tab1);

        expect(getByText('Content 1')).toBeInTheDocument();
        expect(queryByText('Content 2')).not.toBeInTheDocument();
    });
});