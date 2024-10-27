import type { NameProviderType } from "@/types";
import { createContext } from "react";

export const NameProvider = createContext<NameProviderType | null>(null);