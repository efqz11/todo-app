namespace NodeJS {
    interface ProcessEnv {
        NEXTAUTH_SECRET: string;
        JWT_SECRET: string; // Add JWT_SECRET here
        DATABASE_URL: string; // You can add more as needed
        NODE_ENV: "development" | "production" | "test";
    }
}
