
import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Header />
            <main className="pt-16 overflow-hidden">
                {children}
            </main>
            <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border mt-auto bg-[var(--sticky-section)]">
                <p>© 2025 Dokyungja. All rights reserved.</p>
            </footer>
        </div>
    );
}
