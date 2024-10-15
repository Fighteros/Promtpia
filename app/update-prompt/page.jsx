'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react'

import Form from "@components/Form";

const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails();
    }, [promptId])


    const updatePrompt = async (e) => {
        // prevent reload
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt Id not found')

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (res.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err.message);

        }
        finally {
            setSubmitting(false);
        }

    }


    return (
        <Form
            post={post}
            type="Edit"
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}



const page = () => <Suspense>
    <UpdatePrompt />
</Suspense>

export default page