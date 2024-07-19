"use client"

import Image from 'next/image'
import { React, useEffect } from 'react'
import { HiSearch, HiBell, HiChat } from 'react-icons/hi'
import { useSession, signIn, signOut } from 'next-auth/react'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import app from './../Shared/firebaseConfig'
import { useRouter } from 'next/navigation'
import Logo from '../../public/logo.png'

const Header = () => {

    const { data: session } = useSession()
    // console.log(session)

    const router = useRouter()
    const db = getFirestore(app)

    useEffect(() => {
        saveUserInfo()
    }, [session])


    const saveUserInfo = async () => {

        if (session?.user) {

            await setDoc(doc(db, "user", session.user.email), {
                name: session.user.name,
                email: session.user.email,
                userImage: session.user.image
            });
        }
    }


    const onCreate = () => {

        if (session) {
            router.push('/pin-builder')
        }
        else {
            signIn()
        }
    }




    return (
        <div className='flex gap-3 md:gap-2 items-center p-6 justify-between'>
            <Image
                src={Logo}
                height={50}
                width={50}
                alt='logo'
                className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                onClick={() => router.push('/')}
            />

            <button
                className='bg-black text-white p-2 px-4 rounded-full'
                onClick={() => router.push('/')}
            >
                Home
            </button>
            <button
                className='font-semibold p-2 px-4 rounded-full'
                onClick={() => onCreate()}
            >
                Create
            </button>

            <div className='bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex'>
                <HiSearch className='text-[25px] text-gray-500' />
                <input type="text" placeholder='Search' className='bg-transparent outline-none' />
            </div>

            <HiSearch className='text-[25px] text-gray-500 md:hidden' />

            <HiBell className='text-[40px] text-gray-500' />
            <HiChat className='text-[40px] text-gray-500' />
            {session?.user ? <Image
                src={session?.user?.image}
                alt='user-image'
                width={60}
                height={60}
                className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                onClick={() => router.push('/' + session.user.email)}
            />
                :
                <button className='font-semibold p-2 px-4 rounded-full' onClick={() => signIn()}>Login</button>
            }

        </div>
    )
}

export default Header