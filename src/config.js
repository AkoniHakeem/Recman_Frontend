const environments = {
    "development": {
        backendUrl: "http://localhost:3001",
        backendApiPath: "/api/v1"
    }
}
process.env.NODE_ENV || console.log("NODE_ENV is not defined") 
const envName = process.env.NODE_ENV?.trim()
const currentEnvironment = environments[process.env?.NODE_ENV?.toLocaleLowerCase()] || environments.development;

export default currentEnvironment