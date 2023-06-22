"use server";

import { randomUUID } from "crypto";

export const getRandomUID = () => {
    return randomUUID()
}