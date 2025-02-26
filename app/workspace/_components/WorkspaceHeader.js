import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

const WorkspaceHeader = () => {
  return (
    <div className="p-4 flex justify-between shadow-md">
        <Image src={"/logo.svg"} alt="logo" width={50} height={120} />
        <UserButton/>
    </div>
  )
}
export default WorkspaceHeader