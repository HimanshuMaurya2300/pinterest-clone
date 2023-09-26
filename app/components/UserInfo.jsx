import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserInfo = ({ userInfo }) => {

    const router = useRouter()
    console.log(userInfo)

    const { data: session } = useSession()

    const onLogout = () => {
        signOut()
        router.push('/')
    }


    return (
        <div className='flex flex-col items-center'>
            <Image
                src={userInfo.userImage}
                alt='userImage'
                width={100}
                height={100}
                className='rounded-full'
            />

            <h2 className='text-[30px] font-semibold'>{userInfo.name}</h2>
            <h2 className='text-gray-400'>{userInfo.email}</h2>

            <div className="flex gap-4">
                <button className='bg-gray-200 p-2 px-3 rounded-full font-semibold mt-5'>Share</button>
                {session?.user.email === userInfo.email ? <button
                    className='bg-gray-200 p-2 px-3 rounded-full font-semibold mt-5'
                    onClick={() => onLogout()}
                >
                    Logout
                </button> : null}
            </div>

        </div>
    )
}

export default UserInfo