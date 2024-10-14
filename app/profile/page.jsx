'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Component } from 'react';

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

    }

    const handleDelete = async (post) => {

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