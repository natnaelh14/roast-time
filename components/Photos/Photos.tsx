import Image from 'next/image';

const Photos = () => {
    return (
        <div className='flex flex-wrap justify-around my-5'>
            <div className='m-4'>
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={200} height={150} />
            </div>
            <div className='m-4'>
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwzfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={200} height={150} />
            </div>
            <div className='m-4'>
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={200} height={150} />
            </div>
            <div className='m-4'>
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHw3fHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={200} height={150} />
            </div>
        </div>
    )
}

export default Photos;
