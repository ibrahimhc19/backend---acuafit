import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "sonner";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { LINKS } from "@/config/constants";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout, apiError, setApiError } = useAuthContext();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (apiError) {
            const timer = setTimeout(() => {
                setApiError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [apiError]);

    return (
        <>
            <Toaster position="top-center" richColors />
            <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                id="toggleSidebarMobile"
                                aria-expanded={isSidebarOpen}
                                aria-controls="sidebar"
                                className="lg:hidden mr-2 text-primary hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                                onClick={toggleSidebar}
                            >
                                <svg
                                    id="toggleSidebarMobileHamburger"
                                    className={`w-6 h-6 ${
                                        isSidebarOpen ? "hidden" : ""
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <svg
                                    id="toggleSidebarMobileClose"
                                    className={`w-6 h-6 ${
                                        !isSidebarOpen ? "hidden" : ""
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <a
                                href="/dashboard"
                                className="text-xl font-bold flex items-center lg:ml-2.5"
                            >
                                <span className="self-center whitespace-nowrap ml-2 text-primary hidden sm:block">
                                    {" "}
                                    Acuafit
                                </span>
                            </a>
                        </div>
                        <div className="items-center hidden sm:flex">
                            {/* User Avatar */}
                            {/* Deuda */}
                            <div className="rounded-full w-12 h-12 p-2 flex items-center justify-center">
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/ibrahimhc19/portfolio/blob/master/public/favicon.png?raw=tru"
                                        alt="Ibrahim Calzadilla"
                                    />
                                    <AvatarFallback>IC</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex overflow-hidden bg-white pt-16">
                <aside
                    id="sidebar"
                    aria-label="Sidebar"
                    className={`fixed z-20 h-full top-0 left-0 pt-16 flex flex-shrink-0 flex-col w-40 transition-transform duration-500 ease-in-out lg:translate-x-0 ${
                        isSidebarOpen
                            ? "translate-x-0 w-60"
                            : "-translate-x-full"
                    } lg:flex`}
                >
                    <div className="relative flex-1 flex flex-col min-h-0 borderR border-gray-200 bg-white pt-0">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex-1 px-3 bg-white divide-y space-y-1">
                                <ul className="space-y-2 pb-2">
                                    {LINKS.map((link, index) => (
                                        <li key={index} className="text-white">
                                            {link.children ? (
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                    defaultValue="item-0"
                                                >
                                                    <AccordionItem
                                                        value={`item-${index}`}
                                                    >
                                                        <AccordionTrigger className="p-2 group hover:bg-primary hover:no-underline hover:text-white rounded-lg text-sm font-medium text-gray-900">
                                                            {link.name}
                                                            {/* {link.icon ?? ""} */}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pl-2 flex flex-col">
                                                            {link.children.map(
                                                                (child) => (
                                                                    <Link
                                                                        key={
                                                                            child.href
                                                                        }
                                                                        to={
                                                                            child.href
                                                                        }
                                                                        className="text-sm hover:bg-primary p-2 hover:text-white rounded-lg text-gray-700 group"
                                                                    >
                                                                        {
                                                                            child.name
                                                                        }
                                                                    </Link>
                                                                )
                                                            )}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            ) : (
                                                <Link
                                                    to={link.name}
                                                    className={`text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-primary hover:text-muted ${
                                                        isSidebarOpen
                                                            ? "justify-center"
                                                            : ""
                                                    }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {apiError && (
                                    <Alert
                                        variant="destructive"
                                        className="flex gap-0 bg-red-50 border-red-200 mt-4"
                                    >
                                        <AlertDescription className="text-xs">
                                            {apiError}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button
                                    className="mx-auto flex mt-4 w-full"
                                    onClick={() => logout()}
                                >
                                    Cerrar sesión
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
                <div
                    className={`bg-gray-900 fixed inset-0 z-10 transition-opacity duration-500 ease-in-out lg:hidden ${
                        isSidebarOpen ? "opacity-50" : "opacity-0 invisible"
                    }`}
                    id="sidebarBackdrop"
                    onClick={toggleSidebar}
                ></div>
                <div
                    id="main-content"
                    className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-40"
                >
                    <main>
                        <div className="pt-6 px-4">
                            <div className="w-full min-h-[calc(100vh-230px)]">
                                <div className="bg-white shadow rounded-lg ">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="bg-white md:flex md:items-center justify-center shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
                        <ul></ul>
                        <div className="flex justify-center space-x-6">
                            <a
                                href="#"
                                className="text-gray-500 hover:text-primary"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-500 hover:text-primary"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
