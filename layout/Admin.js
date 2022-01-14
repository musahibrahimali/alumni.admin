import React, { useEffect } from 'react';
import { AdminNavbar, Footer, Sidebar } from "../components/components";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSelector } from "react-redux";

// Create a client
const queryClient = new QueryClient();

const Admin = (props) => {
    /* props */
    const { children } = props;
    /* data layer */
    const theme = useSelector((state) => state.theme.theme);

    // on component mount (when it is rendered in the browser)
    useEffect(() => {
        // this function handles adding shaddow to the header upon scrolling
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const header = document.querySelector(".header");
                const nav = document.querySelector(".navbar_t");
                const headerOffsetTop = header.offsetHeight + 20;
                const headerScrollTop = header.offsetTop;
                if (headerScrollTop >= headerOffsetTop) {
                    header.classList.add("custom__shadow");
                    nav.classList.remove("custom__divider");
                } else {
                    nav.classList.add("custom__divider");
                    header.classList.remove("custom__shadow");
                }
            }
        }

        /// add shaddow to header on scroll
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className={theme ? "dark" : ""}>
                    <div className="flex">
                        {/* sticky sidebar */}
                        <div className="w-[300px] max-w-[600px] sticky top-0 h-screen bg-blue-600">
                            <Sidebar />
                        </div>
                        {/* individual pages */}
                        <div className="w-full bg-white dark:bg-gray-900 h-full">
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
                {/* query dev tools */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default Admin;
