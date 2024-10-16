'use client'


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = ({ params }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    // should add loading 

    const { id } = params;

    const fetchPosts = async () => {
        const response1 = await fetch(`/api/users/${id}/`)
        const response2 = await fetch(`/api/users/${id}/posts`)


        const data1 = await response1.json();
        const data2 = await response2.json();

        setUser(data1);
        setPosts(data2);
    }

    useEffect(() => {
        fetchPosts();
    }, [])




    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to Delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error.message);

            }
        }
    }


    return (
        <Profile
            name={user?.username}
            desc={`Welcome to ${user?.username} personalized profile page`}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />

    )
}

export default ProfilePage