const environments = {
    "development": {
        backendUrl: "http://localhost:3001",
        backendApiPath: "/api/v1"
    },
    "production": {
        backendUrl: "https://recman-25v4o.ondigitalocean.app",
        backendApiPath: "/api/v1"
    }
}

const envName = process.env.NODE_ENV.trim()
const currentEnvironment = environments[`${process.env.NODE_ENV.toLowerCase()}`] || environments.development;

export default currentEnvironment