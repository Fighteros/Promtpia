'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = ({ params }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPost = async () => {
            const res = await fetch(`/api/prompt/${params.id}`);
            const post = await res.json();

            setPost(post);
        }

        getPost();

    }, [])


    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/prompt/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (res.ok) router.push('/profile')

        } catch (err) {
            console.log(err.message);
        }
    }



    return (
        <Form
            post={post}
            type="Edit"
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleEdit}
        />
    )
}

export default EditPrompt