import { connectDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {

    try {
        await connectDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
}


export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectDB();

        const exitingPrompt = await Prompt.findById(params.id);
        if (!exitingPrompt) return new Response("Prompt not found", { status: 404 });

        exitingPrompt.prompt = prompt;
        exitingPrompt.tag = tag;

        await exitingPrompt.save()

        return new Response(JSON.stringify(exitingPrompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {

    try {
        await connectDB();

        const exitingPrompt = await Prompt.findByIdAndDelete(params.id);
        if (!exitingPrompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify({}), { status: 204 })

    } catch (error) {

        return new Response("Failed to delete prompt", { status: 500 })
    }
}
