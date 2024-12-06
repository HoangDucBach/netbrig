import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        tokens: {
        },
        semanticTokens: {
            colors: {
                primary: {
                    DEFAULT: { value: "#D4FF70" },
                    "on-primary": { value: "#11130C" },
                    1: { value: "#11130C" },
                    2: { value: "#151A10" },
                    3: { value: "#1F2917" },
                    4: { value: "#29371D" },
                    5: { value: "#334423" },
                    6: { value: "#3D522A" },
                    7: { value: "#496231" },
                    8: { value: "#577538" },
                    9: { value: "#BDEE63" },
                    10: { value: "#D4FF70" },
                    11: { value: "#BDE56C" },
                    12: { value: "#E3F7BA" },
                }
            },
        },
    },
})

export default createSystem(defaultConfig, config)