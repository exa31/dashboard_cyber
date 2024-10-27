import icon from "../assets/icon.png";

import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
    IconArrowLeft,
    IconArrowRight,
    IconBrandTabler,
    IconBuildingStore,
    IconNotes,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../libs/utils";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Layout() {

    const [cookies] = useCookies(['token']);

    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: (
                <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Products",
            href: "products",
            icon: (
                <IconBuildingStore className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            )
        },
        {
            label: "Orders",
            href: "orders",
            icon: (
                <IconNotes className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            )
        },
        {
            label: cookies.token ? "Logout" : "Login",
            href: "/login",
            icon: (
                cookies.token ? <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" /> :
                    <IconArrowRight className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md max-w-screen min-h-screen flex flex-col md:flex-row bg-gray-200 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-y-auto",
                "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="sticky top-0 justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="flex flex-col gap-2 mt-8">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}

                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="flex-shrink-0 rounded-full h-7 w-7"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Outlet />
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            to={"/"}
            className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
        >
            <img src={icon} className="object-fill w-8 h-8 " />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black whitespace-pre dark:text-white"
            >
                Cyber
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            to={"/"}
            className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
        >
            <img src={icon} className="object-fill w-8 h-8" />
        </Link>
    );
};


