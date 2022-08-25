import ModelState from "./Model/ModelState"
import { combineComponents } from "./combineContext.tsx"

const providers = [ModelState]

export const AppContextProvider = combineComponents(...providers)
