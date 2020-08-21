import React from "react";
import { Container } from 'rsuite';

export const SiteLayout: React.FC = ({ children }) => {
    return (
        <Container>
              {children}
        </Container>
    );
}