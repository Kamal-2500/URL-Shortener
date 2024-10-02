import dotenv from "dotenv";
import { NonNullableProps } from "../utils";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
})

interface Env {
    SERVER_HOST: string | undefined;
    SERVER_PORT: string | undefined;
    DB_HOST: string | undefined;
    DB_PORT: string | undefined;
    SHORTEN_BASE_URL: string | undefined;
}

type SenitizedEnv = NonNullableProps<Env>;

const getEnv = (): Env => {
    return {
        SERVER_HOST: process.env.SERVER_HOST,
        SERVER_PORT: process.env.SERVER_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        SHORTEN_BASE_URL: process.env.SHORTEN_BASE_URL
    }
}

const getSenitizedEnv = (env: Env): SenitizedEnv => {
    for (const [key, value] of Object.entries(env)) {
        if (!value) {
            throw new Error(`Value of ${key} is null`);
        }
    }

    return env as SenitizedEnv;
}

interface Configs {
    server: {
        host: string;
        port: number
    },
    db: {
        host: string;
        port: string;
    },
    shorten: {
        baseUrl: string
    }
}

const senitizedEnv = getSenitizedEnv(getEnv());

export const configs: Configs = {
    server: {
        host: senitizedEnv.SERVER_HOST,
        port: Number(senitizedEnv.SERVER_PORT)
    },
    db: {
        host: senitizedEnv.DB_HOST,
        port: senitizedEnv.DB_PORT
    },
    shorten: {
        baseUrl: senitizedEnv.SHORTEN_BASE_URL
    }
}