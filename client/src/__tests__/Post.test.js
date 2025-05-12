import { render, screen } from '@testing-library/react';
import Properties from '../Home/Properties/properties'

test('renders post title', () => {
    render(
        <Properties />
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
});
