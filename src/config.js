const environments = {
    "development": {
        backendUrl: "http://localhost:3001",
        backendApiPath: "/api/v1"
    },
    "production": {
        backendUrl: "https://port-3001-my-first-container-akozymayor288218.codeanyapp.com",
        backendApiPath: "/api/v1"
    }
}

const envName = process.env.NODE_ENV.trim()
const currentEnvironment = environments[`${process.env.NODE_ENV.toLowerCase()}`] || environments.development;

export default currentEnvironment