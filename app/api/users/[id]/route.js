import { connectDB } from "@utils/database";
import User from '@models/user';

export const GET = async (req, { params }) => {

    try {
        await connectDB();
        const user = await User.findById(params.id);
        if (!user) new Response("couldn't find user", { status: 404 })
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        return new Response("Failed to fetch user", { status: 500 })

    }
}