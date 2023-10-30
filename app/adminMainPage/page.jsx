import Link from 'next/link';
import React, { Fragment } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/topics', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Failed to fetch topics');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading topics: ', error);
    }
};

export default async function page() {
    const { topics } = await getTopics();

    const options = Array.from({ length: 54 }, (_, index) => index + 1);

    const handleClick = async (option) => {
        const selectedTopic = topics.find((topic) => topic.title === `${option}-maktab`);
        if (selectedTopic) {
            const res = await fetch(`/schools/${selectedTopic.id}`);
            if (res.ok) {
                const topicData = await res.json();
                console.log(topicData);
            } else {
                console.log('Failed to fetch topic data');
            }
        }
    };

    return (
        <div className='mt-10 max-w-[1400px] ml-auto mr-auto'>
            <h1 className='poppins text-3xl font-bold'>Chortoq tumanidagi barcha maktablar</h1>
            {options.map((option, index) => (
                <>
                    <div className='w-full h-[10px] bg-transparent rounded-xl'></div>
                    <Link href={"/schools"}>
                        <div className='max-w-[1400px] mx-auto w-full shadow-md p-3 bg-white rounded-md flex justify-between items-center h-full'>
                            <p className='text-[18px] poppins'>
                                {option}-maktab
                            </p>
                            <div className='w-12 h-12 bg-[#f8f8f8] rounded-md flex items-center justify-center'>
                                <AiOutlineEye className='text-3xl' />
                            </div>
                        </div>
                    </Link>
                </>
            ))}
        </div>
    );
}