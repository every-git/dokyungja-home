
import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Header />
            <main className="pt-16">
                {children}
            </main>
            <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border mt-auto">
                <p>© 2025 Dokyungja. All rights reserved.</p>
            </footer>
        </div>
    );
}
