import { createClient } from '@supabase/supabase-js'
import { AdapterUser } from 'next-auth/adapters';


const supabase = createClient(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    `${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    {
        db: {
            schema: 'next_auth',
        }
    }

)


export async function stupidFix(id: string) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .maybeSingle()


    console.log(data);
    if (error) throw error
    if (!data) return null
    let u = {
        ...data,
        id: id
    } as AdapterUser
    return u;
}
