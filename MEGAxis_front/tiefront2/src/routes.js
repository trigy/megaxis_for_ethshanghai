
import PlusGPT from "./views/PlusGPT/PlusGPT"
import PromptNFT from "./views/PromptNFT/PromptNFT"
import ToolsStore from "./views/ToolsStore"
import AITools from "./views/AITools"

import React, { createContext, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import PromptDetail from "./views/PromptNFT/component/PromptDetail/PromptDetail"
import CreatePrompt from "./views/PromptNFT/component/CreatePrompt/CreatePrompt"
import { TypeContext } from "./layout"
import Welcome from "./views/Welcome/Welcome"
import AboutUs from "./views/AboutUs/AboutUs"

export const UserContext = createContext()
const AppRoutes = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<PlusGPT />} />
                <Route path="/detail/:id" element={<PromptDetail />} />
                <Route path="/prompt-nft/:type" element={<PromptNFT />} />
                <Route path="/tools-store" element={<ToolsStore />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/create" element={<CreatePrompt />} />
                <Route path="/Welcome" element={<Welcome />} />
                <Route path="/AboutUs" element={<AboutUs />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes
