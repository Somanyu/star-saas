import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Members = async () => {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession();
    // console.log("🚀 ~ file: page.jsx:9 ~ Members ~ session:", session)

    if (!session) {
        // this is a protected route - only users who have active subscription in can view this route
        redirect('/login')
    }
    return (
        <div>Members</div>
    )
}

export default Members