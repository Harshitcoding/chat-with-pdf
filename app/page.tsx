'use client'

import { Button } from "@/components/ui/button"
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
  ArrowRightIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    name: "Store your PDF Documents",
    description: "Keep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Responses",
    description: "Experience lightning-fast answers to your queries, ensuring you get the information you need instantly",
    icon: ZapIcon
  },
  {
    name: "Chat Memorization",
    description: "Our intelligent chatbot remembers previous interactions, providing a seamless and personalized experience",
    icon: BrainCogIcon
  },
  {
    name: "Interactive PDF Viewer",
    description: "Engage with your PDFs like never before using our intuitive and interactive viewer",
    icon: EyeIcon
  },
  {
    name: "Cloud Backup",
    description: "Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage",
    icon: ServerCogIcon
  },
  {
    name: "Responsive Across Devices",
    description: "Access and chat with your PDFs seamlessly on any device, whether it's your desktop, tablet, or smartphone",
    icon: MonitorSmartphoneIcon
  }
]

export default function Home() {
  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform Your PDFs into</span>
              <span className="block text-indigo-600">Interactive Conversations</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Upload your document, and our chatbot will answer questions, summarize content, and address all your queries. 
              <span className="font-semibold text-indigo-600"> Chat with PDF </span>
              turns static documents into dynamic conversations, enhancing productivity tenfold effortlessly.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="rounded-full px-8 py-3 text-lg font-semibold shadow-lg">
                  <Link href="/dashboard">
                    Get started
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-20"
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Image
              alt="App screenshot"
              src="https://i.imgur.com/VciRSTI.jpeg"
              width={2432}
              height={1442}
              className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5" />
          </div>
        </motion.div>

        <div className="relative mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powerful Features for Seamless Interaction
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Discover how our platform revolutionizes the way you interact with your PDF documents
            </p>
          </div>

          <div className="mt-16">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}