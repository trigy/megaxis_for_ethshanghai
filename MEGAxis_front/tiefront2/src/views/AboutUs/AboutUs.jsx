import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'antd'
import './AboutUs.css'
import { getByKey, getAllPrompt } from '../../api/PromptNFT'
import { generateLikes } from '../../utils/tools'
import Sidebar from '../../layout/sidebar_home'
import Navbar from '../../layout/navbar'

const AboutUs = () => {
  return (
    <div className="container0">
      <Sidebar />
      <Navbar />
      <div className="containers0">
        <div className="title0">MEGAxis</div>

        <div className="content0">
          MEGAxis is the world's first decentralized AI service protocol, aiming
          to serve 10 billion+ super individuals brought by the AI revolution
          with a one-stop platform. Our product portfolio includes the UGC
          Prompt NFT market, AI App aggregation platform, and AI Avatar social
          space.
        </div>
        <div className="subtitle0">MEGAxis Unique Selling Points:</div>
        <div className="content0">
          1. The platform aggregates 1,000 AI applications and 50,000
          high-quality AI Prompts, making it convenient for users to work and
          interact with AI Avatars for companionship;
        </div>
        <div className="content0">
          2. Winner of multiple awards at the 2023 ETH Ethereum Global
          Hackathon;
        </div>
        <div className="content0">
          3. Supported by leading global VC investments and incubators;
        </div>
        <div className="content0">
          4. Core team members come from top institutions such as Tsinghua
          University, MIT, Zhejiang University, Alibaba, ByteDance, and Meituan.
        </div>
        <div className="subtitle0">
          As a user of the MEGAxis platform, you will enjoy the following
          benefits:
        </div>
        <div className="content0">
          1. Create your AI prompt NFT, craft your AI Avatar NFT image, and
          issue your AI App tokens to gain continuous economic incentives;
        </div>
        <div className="content0">
          2. One-stop experience for a wide range of cutting-edge AI
          applications, free, convenient, and secure;
        </div>
        <div className="content0">
          3. Explore the vibrant Prompt NFT creation community, improve work
          efficiency, and generate high-quality AI-created content;
        </div>
        <div className="content0">
          4. Connect your existing PFP NFT (Like BAYC, Azuki) to your AI Avatar,
          establish close connections with AI Avatars of various appearances and
          personalities, and enjoy fun social interactions and delightful
          learning-sharing experiences;
        </div>
        <div className="content0">
          5. Become a member of our thriving community, interact with
          like-minded friends, share knowledge, and embark on an exciting AI
          journey together.
        </div>

        <div className="subtitle0">Contacts:</div>
        <div className="content0">
          We warmly welcome you to join the MEGAxis community and embrace the
          future of Web3 together. If you are interested in our project or have
          any questions, please feel free to contact us through the following
          channels:
        </div>
        <div className="content0">
          Twitter:{' '}
          <a href="https://twitter.com/Megaxis_AI">
            https://twitter.com/Megaxis_AI
          </a>
        </div>
        <div className="content0">
          Discord:{' '}
          <a href="https://discord.gg/pCG3SAkKDR">
            https://discord.gg/pCG3SAkKDR
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
