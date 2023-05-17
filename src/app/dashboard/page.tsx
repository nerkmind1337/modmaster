import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FC } from 'react'

interface PageProps {

}

const Page = async ({ }) => {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <span>{JSON.stringify(session?.user)}</span>
        </div>
    )
}

export default Page