'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Component } from 'react';
import { revalidatePath } from 'next/cache';

import Profile from '@components/Profile';

const ProfilePage = () => {
    const [posts, setPosts] = useState([])
    const { data: session } = useSession();
    const router = useRouter();


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();

            setPosts(data);
        }

        if (session?.user.id) fetchPosts();

    }, [])





    const handleEdit = async (post) => {
        router.push(`/prompt/${post._id}/edit`);
    }

    const handleDelete = async (post) => {
        const confirmed = confirm('Do Really want to delete this?');
        try {
            const res = await fetch(`/api/prompt/${post._id.toString()}`,
                {
                    method: 'DELETE'
                }
            )
            const newPosts = posts.filter(p => p._id !== post._id);
            if (confirmed) setPosts(newPosts)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />

    )
}

export default ProfilePage