// GET (READ)
// PATCH (UPDATE)
// DELETE (DELETE)

import Prompt from "@models/prompt";
import { connectDB } from "@utils/database"


export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id);

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify(err.message), { status: 500 })
    }
}


export const PUT = async (req, { params }) => {
    try {
        await connectDB();
        const data = await req.json();
        console.log(data)
        const prompt = await Prompt.findByIdAndUpdate(
            params.id,
            data,
            { new: true });

        if (prompt) return new Response(JSON.stringify(prompt), { status: 200 }); length
        return new Response(`Couldn't find ${params.id}`, { status: 404 });
    } catch (err) {
        return new Response(JSON.stringify(err.message), { status: 500 })
    }
}


export const DELETE = async (request, { params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findByIdAndDelete(params.id);
        if (prompt) return new Response(JSON.stringify({}), { status: 204 });
        return new Response(`Couldn't find ${params.id}`, { status: 404 });
    } catch (err) {
        return new Response(JSON.stringify(err.message), { status: 500 })
    }
}