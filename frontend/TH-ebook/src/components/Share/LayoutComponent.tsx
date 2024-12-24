import NavBar from '../NavBar/NavBar.tsx';

interface Props {
    children: React.ReactNode;
    isMobile: boolean;
}

const Layout = ({children, isMobile}: Props) => {
    return (
        <>
            <div className="h-[var(--navbar-height)]">
                <NavBar isMobile={isMobile}/>
            </div>
            {children}
        </>
    );
}

export default Layout;